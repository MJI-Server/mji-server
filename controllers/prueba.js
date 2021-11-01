const { response } = require('express');

const pruebaSchema = require('../models/prueba');
const obtenerConexion = require('../db/conexiones');
const obtenerModelo = require('../db/modelos');

const crearPrueba = async ( req, res = response ) => {

    
    try {
        const {conexion,instrucciones,name,inicio, termino} = req.body;
        const {idCurso,idAsignatura,idUnidad} = req.params;
        let conn = obtenerConexion(conexion);
        let Prueba = obtenerModelo('Prueba', pruebaSchema, conn);

        const prueba = new Prueba({
            instrucciones,
            name,
            inicio,
            termino,
            idCurso,
            idAsignatura,
            idUnidad
        });

        await prueba.save();
      
        res.status(200).json({
            ok:true,
            prueba
        })
    } catch (msg) {
        console.log(msg)
        res.status(400).json({
            msg
        })
    }

}

const actualizarPrueba = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        const {conexion} = req.body;
        let conn = obtenerConexion(conexion);
        let Prueba = obtenerModelo('Prueba', pruebaSchema, conn);
        const prueba = await Prueba.findById(id);
        if(!prueba){
            return res.status(404).json({
                ok:false,
                msg:'La prueba no existe'
            })
        }

        const newPrueba = await Prueba.findByIdAndUpdate(id, req.body, {new:true});

        res.json({
            ok:true,
            prueba:newPrueba
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    

}

const eliminarPrueba = async ( req, res = response ) => {

    try {
        const {id} = req.params;
        const {conexion} = req.body;
        let conn = obtenerConexion(conexion);
        let Prueba = obtenerModelo('Prueba', pruebaSchema, conn);
        const prueba = await Prueba.findById(id);
        if(!prueba){
            return res.status(404).json({
                ok:false,
                msg:'La prueba no existe'
            })
        }

        prueba.status = !prueba.status;
        await prueba.save();
        res.json({
            ok:true,
            msg:'Prueba desactivada'
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

}


const getPruebas = async(req, res = response)=>{
    
    try {
    const {idCurso,idAsignatura} = req.params;
    const {conexion} = req.body;
    let conn = obtenerConexion(conexion);
    let Prueba = obtenerModelo('Prueba', pruebaSchema, conn);
    const pruebas = await Prueba.find({idCurso,idAsignatura});
    
    res.status(200).json({
        ok:true,
        pruebas
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
    crearPrueba,
    actualizarPrueba,
    eliminarPrueba,
    getPruebas,
}
