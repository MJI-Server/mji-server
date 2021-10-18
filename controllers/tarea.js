const Tarea = require("../models/tarea");
const { response } = require("express");
const Unidad = require("../models/unidad");

const getTareas = async ( req, res = response ) => {

    const { idAsignatura } = req.body;

    try {
        
        const tareas = await Tarea.find({idAsignatura}).populate({path:'enunciados', populate:{path:'items'}});
        res.status(200).json({
            ok: true,
            tareas
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })
    }
}

const createTarea = async ( req, res = response ) => {

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