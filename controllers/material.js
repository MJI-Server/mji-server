const { response } = require('express');
const Material = require('../models/material');
const path = require('path');
const fs = require('fs');
const { subirArchivo } = require('../helpers/subir-archivo');
const Colegio = require('../models/colegio');
const Curso = require('../models/curso');
const Unidad = require('../models/unidad');

const crearMaterial = async ( req, res = response ) => {

    
    try {
        const {idUnidad,idCurso,idColegio} = req.params;
        const colegio = await Colegio.findById(idColegio);
        const curso = await Curso.findById(idCurso);
        const unidad = await Unidad.findById(idUnidad);
        
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${unidad.unidad}`;
        const nombre = await subirArchivo(req.files,undefined,carpeta);
        if(!nombre){
            return res.status(400).json({
                ok:false,
                msg:'Error al crear material'
            })
        }
        const material = new Material({
            idColegio,
            idCurso,
            idUnidad,
            material:nombre,
            name:req.files.archivo.name

        });
        await material.save();
        const pathImagen = path.join(__dirname, '../uploads', carpeta);
        const file = res.sendFile( pathImagen);
      
        res.status(200).json({
            ok:true,
            material,
            file
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

}

const actualizarMaterial = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        const material = await Material.findById(id);
        
        const colegio = await Colegio.findById(material.idColegio);
        const curso = await Curso.findById(material.idCurso);
        const unidad = await Unidad.findById(material.idUnidad);
        
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${unidad.unidad}`;

        //Limpiar imágenes previas
        const pathImagen = path.join(__dirname, '../uploads', carpeta,material.material);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    

        const nombre = await subirArchivo(req.files,undefined,carpeta);
        material.material = nombre;
        material.name = req.files.archivo.name
        await material.save();


        res.json({
            ok:true,
            material
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    

}

const eliminarMaterial = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        const material = await Material.findById(id);
        
        const colegio = await Colegio.findById(material.idColegio);
        const curso = await Curso.findById(material.idCurso);
        const unidad = await Unidad.findById(material.idUnidad);

        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${unidad.unidad}`;


        //Limpiar imágenes previas
        const pathImagen = path.join(__dirname, '../uploads', carpeta,material.material);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    

        await Material.findByIdAndDelete(id);
        res.json({
            ok:true
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}

const mostrarMaterial = async(req, res = response)=>{
    
    const {id} = req.params;
    const {idUnidad,idCurso,idColegio} = req.body;
    const carpeta = `${idColegio}/${idCurso}/${idUnidad}`;

    //Limpiar imágenes previas
        const pathImagen = path.join(__dirname, '../uploads', carpeta);
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen);
        }
}

module.exports = {
    crearMaterial,
    actualizarMaterial,
    eliminarMaterial,
    mostrarMaterial
}
