const { response } = require('express');
const path = require('path');
const fs = require('fs');

const prueba_alumnoSchema = require('../models/prueba_alumno');
const { subirArchivo } = require('../helpers/subir-archivo');
const Colegio = require('../models/colegio');
const Curso = require('../models/curso');
const Unidad = require('../models/unidad');
const Asignatura = require('../models/asignatura');
const obtenerConexion = require('../db/conexiones');
const obtenerModelo = require('../db/modelos');

const ingresarPrueba = async ( req, res = response ) => {

    
    try {
        const {idUnidad,idCurso,idAsignatura,idPrueba} = req.params;
        const {conexion} = req.body;
        const {colegio,curso,asignatura,unidad,idColegio} = req;
        const {id} = req.usuario;

        
        
        let conn = obtenerConexion(conexion);
        let PruebaAlumno = obtenerModelo('PruebaAlumno', prueba_alumnoSchema, conn);
        let Prueba = obtenerModelo('Prueba', prueba_alumnoSchema, conn);

        const verificarPrueba = await Prueba.findById(idPrueba);
        if(!verificarPrueba || verificarPrueba.status === false){
            return res.status(404).json({
                ok:false,
                msg:'La prueba no es valida o ya se cumplio el plazo de entrega'
            })
        }
        const carpeta = `${colegio}/${curso}/${asignatura}/${unidad.split(':')[0]}/Pruebas/`;
        const nombre = await subirArchivo(req.files,undefined,carpeta);
        if(!nombre){
            return res.status(400).json({
                ok:false,
                msg:'Error al subir la prueba'
            })
        }

        const prueba = new PruebaAlumno({
            idColegio,
            idCurso,
            idUsuario:id,
            idUnidad,
            idPrueba,
            idAsignatura,
            prueba:nombre,
            name:req.files.archivo.name
        });


        await prueba.save();
        const pathImagen = path.join(__dirname, '../uploads', carpeta);
        const file = res.sendFile( pathImagen);
      
        res.status(200).json({
            ok:true,
            prueba,
            file
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }

}

const actualizaPruebaAlumno = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        const {conexion,idPrueba} = req.body;
        let conn = obtenerConexion(conexion);
        let PruebaAlumno = obtenerModelo('PruebaAlumno', prueba_alumnoSchema, conn);
        let Prueba = obtenerModelo('Prueba', prueba_alumnoSchema, conn);

        const verificarPrueba = await Prueba.findById(idPrueba);
        if(!verificarPrueba || verificarPrueba.status === false){
            return res.status(404).json({
                ok:false,
                msg:'La prueba no es valida o ya se cumplio el plazo de entrega'
            })
        }

        const prueba = await PruebaAlumno.findById(id);
        
        const colegio = await Colegio.findById(prueba.idColegio);
        const curso = await Curso.findById(prueba.idCurso);
        const unidad = await Unidad.findById(prueba.idUnidad);
        const asignatura = await Asignatura.findById(prueba.idAsignatura);
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad.split(':')[0]}/Pruebas`;
        
        //Limpiar imágenes previas
        const pathImagen = path.join(__dirname, '../uploads', carpeta,prueba.prueba);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    

        const nombre = await subirArchivo(req.files,undefined,carpeta);
        prueba.prueba = nombre;
        prueba.name = req.files.archivo.name
        await prueba.save();


        res.json({
            ok:true,
            prueba
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    

}

const eliminarPruebaAlumno = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        let conn = obtenerConexion('MJIServer');
        let PruebaAlumno = obtenerModelo('PruebaAlumno', prueba_alumnoSchema, conn);

        let Prueba = obtenerModelo('Prueba', prueba_alumnoSchema, conn);

        const verificarPrueba = await Prueba.findById(idPrueba);
        if(!verificarPrueba || verificarPrueba.status === false){
            return res.status(404).json({
                ok:false,
                msg:'La prueba ya no puede eliminarse'
            })
        }
        const prueba = await PruebaAlumno.findById(id);
        
        const colegio = await Colegio.findById(prueba.idColegio);
        const curso = await Curso.findById(prueba.idCurso);
        const unidad = await Unidad.findById(prueba.idUnidad);
        const asignatura = await Asignatura.findById(prueba.idAsignatura);

        // .replace(/ /g, "")
        const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad.split(':')[0]}`;

        //Limpiar imágenes previas
        const pathImagen = path.join(__dirname, '../uploads', carpeta,prueba.prueba);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    

        await PruebaAlumno.findByIdAndDelete(id);
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

const mostrarPruebaAlumno = async(req, res = response)=>{
    
    try {
    const {id,conexion,idColegio} = req.params;
    
    let conn = obtenerConexion(conexion);
    let PruebaAlumno = obtenerModelo('PruebaAlumno', prueba_alumnoSchema, conn);
    const prueba = await PruebaAlumno.findById(id);
    
    const colegio = await Colegio.findById(prueba.idColegio);
    const curso = await Curso.findById(prueba.idCurso);
    const unidad = await Unidad.findById(prueba.idUnidad);
    const asignatura = await Asignatura.findById(prueba.idAsignatura);
    const carpeta = `${colegio.nombre}/${curso.curso}-${curso.letra}/${asignatura.asignatura}/${unidad.unidad.split(':')[0]}/Pruebas/${prueba.prueba}`;

        const pathImagen = path.join(__dirname, '../uploads', carpeta);
        if(fs.existsSync(pathImagen)){
            return res.sendFile( pathImagen);
        }

            res.json({
                ok:false
            })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}
const getPruebasAlumno = async(req, res = response)=>{
    
    try {
    const {idPrueba} = req.params;
    const {conexion} = req.body;
    let conn = obtenerConexion(conexion);
    let PruebaAlumno = obtenerModelo('PruebaAlumno', prueba_alumnoSchema, conn);
    const prueba = await PruebaAlumno.findOne({idPrueba});
    
    res.status(200).json({
        ok:true,
        prueba
    });

 
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    ingresarPrueba,
    actualizaPruebaAlumno,
    eliminarPruebaAlumno,
    mostrarPruebaAlumno,
    getPruebasAlumno,
}
