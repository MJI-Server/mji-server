const EnunciadoSchema = require('../models/enunciado');
const { response } = require("express");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const TareaSchema = require("../models/tarea");
const Unidad = require("../models/unidad");

const getTareas = async ( req, res = response ) => {

    const { idAsignatura } = req.body;

    try {

        let conn = obtenerConexion(req.body.conexion);
        let Tarea = obtenerModelo('Tarea', TareaSchema, conn);
        let Enunciado = obtenerModelo('Enunciado', EnunciadoSchema, conn);
        const tareas = await Tarea.find({idAsignatura}).populate({path:'enunciados',model:Enunciado, populate:{path:'items'}});
        res.status(200).json({
            ok: true,
            tareas
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })
    }
}

const createTarea = async ( req, res = response ) => {

    let conn = obtenerConexion(req.body.conexion);
    let Tarea = obtenerModelo('Tarea', TareaSchema, conn);

    const tarea = new Tarea( req.body );

    const { idUnidad } = req.body;

    try {       
        
        const unidad = await Unidad.findById( idUnidad );

        if (!unidad) {
            return res.status(401).json({
                ok: false,
                msg: 'La unidad no existe'
            });
        }

        const tareaSaved = await tarea.save();

        res.status(201).json({
            ok: true,
            tarea: tareaSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }

}

const updateTarea = async ( req, res = response ) => {

    const tareaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Tarea = obtenerModelo('Tarea', TareaSchema, conn);

    try {
        
        const tarea = await Tarea.findById( tareaID );

        if( !tarea ){
            return res.status(404).json({
                ok: false,
                msg: 'La Tarea no existe por ese id'
            })
        }

        const nuevaTarea = {
            ...req.body
        }

        const tareaUpdated = await Tarea.findByIdAndUpdate( tareaID, nuevaTarea, { new: true } );

        res.json({
            ok: true,
            tarea: tareaUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }

}

const deleteTarea = async ( req, res = response ) => {

    const tareaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Tarea = obtenerModelo('Tarea', TareaSchema, conn);

    try {
        
        const tarea = await Tarea.findById( tareaID );

        if( !tarea ){
            return res.status(404).json({
                ok: false,
                msg: 'La Tarea no existe por ese id'
            })
        }

        tarea.status = !tarea.status;

        await tarea.save();

        res.json({
            ok: true,
            tarea
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }

}

module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
}