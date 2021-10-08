const { response } = require('express');
const path = require('path');
const fs = require('fs');

const materialSchema = require('../models/material');
const { subirArchivo } = require('../helpers/subir-archivo');
const Colegio = require('../models/colegio');
const Curso = require('../models/curso');
const Unidad = require('../models/unidad');
const Asignatura = require('../models/asignatura');
const obtenerConexion = require('../db/conexiones');
const obtenerModelo = require('../db/modelos');

const crearMaterial = async ( req, res = response ) => {

    
    try {
        const {idUnidad,idCurso,idAsignatura,idColegio} = req.params;
        const {conexion} = req.body;
        const {colegio,curso,asignatura,unidad} = req;
        
        const carpeta = `${colegio}/${curso}/${asignatura}/${unidad}`;
        const nombre = await subirArchivo(req.files,undefined,carpeta);
        if(!nombre){
            return res.status(400).json({
                ok:false,
                msg:'Error al crear material'
            })
        }
        let conn = obtenerConexion(conexion);
        let Material = obtenerModelo('Material', materialSchema, conn);

        const material = new Material({
            idColegio,
            idCurso,
            idUnidad,
            idAsignatura,
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
        const {conexion} = req.body;
        let conn = obtenerConexion(conexion);
        let Material = obtenerModelo('Material', materialSchema, conn);
        const material = await Material.findById(id);
        
        const colegio = await Colegio.findById(material.idColegio);
        const curso = await Curso.findById(material.idCurso);
        const unidad = await Unidad.findById(material.idUnidad);
        const asignatura = await Asignatura.findById(material.idAsignatura);
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad}`;
        
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
        let conn = obtenerConexion('MJIServer');
        let Material = obtenerModelo('Material', materialSchema, conn);
        const material = await Material.findById(id);
        
        const colegio = await Colegio.findById(material.idColegio);
        const curso = await Curso.findById(material.idCurso);
        const unidad = await Unidad.findById(material.idUnidad);
        const asignatura = await Asignatura.findById(material.idAsignatura);

        // .replace(/ /g, "")
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad}`;




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
    
    try {
    const {id,conexion} = req.params;
    
    let conn = obtenerConexion(conexion);
    let Material = obtenerModelo('Material', materialSchema, conn);
    const material = await Material.findById(id);
    
    const colegio = await Colegio.findById(material.idColegio);
    const curso = await Curso.findById(material.idCurso);
    const unidad = await Unidad.findById(material.idUnidad);
    const asignatura = await Asignatura.findById(material.idAsignatura);
    const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad}/${material.material}`;

        const pathImagen = path.join(__dirname, '../uploads', carpeta);
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen);
        }
        console.log('Error')

            res.json({
                ok:false
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const getMateriales = async(req, res = response)=>{
    
    try {
    const {idAsignatura,idCurso} = req.params;
    const {conexion} = req.body;
    let conn = obtenerConexion(conexion);
    let Material = obtenerModelo('Material', materialSchema, conn);
    const materiales = await Material.find({idAsignatura,idCurso});
    
    res.status(200).json({
        ok:true,
        materiales
    });

 
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    crearMaterial,
    actualizarMaterial,
    eliminarMaterial,
    mostrarMaterial,
    getMateriales
}
