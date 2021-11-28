const EnunciadoSchema = require('../models/enunciado');
const TareaSchema = require('../models/tarea');
const { response } = require('express');
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");

const createEnunciado = async ( req, res = response ) => {

    const { idTarea } = req.body;
    
    try {
        let conn = obtenerConexion(req.body.conexion);
        let Tarea = obtenerModelo('Tarea', TareaSchema, conn);
        let Enunciado = obtenerModelo('Enunciado', EnunciadoSchema, conn);
        const tarea = await Tarea.findById( idTarea );
        
        const enunciado = new Enunciado( req.body )
        if( !tarea ){
            return res.status(401).json({
                ok: false,
                msg: 'La tarea no existe'
            })
        }

        tarea.enunciados = [ ...tarea.enunciados, enunciado.id ];
        await enunciado.save();
        await tarea.save();

        res.status(201).json({
            ok: true,
            enunciado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
}

const updateEnunciado = async ( req, res = response ) => {

    const enunciadoID = req.params.id;

    try {
        
        const enunciado = await Enunciado.findById( enunciadoID );

        if ( !enunciado ) {
            return res.status(404).json({
                ok: false,
                msg: 'El enunciado no existe'
            });
        }

        const nuevoEnunciado = {
            ...req.body
        }

        const enunciadoUpdated = await Enunciado.findByIdAndUpdate( enunciadoID, nuevoEnunciado, { new: true } );
        
        res.status(200).json({
            ok: true,
            enunciado: enunciadoUpdated
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });

    }
}

const deleteEnunciado = async ( req, res = response ) => {

    const enunciadoID = req.params.id;

    try {
        
        const enunciado = await Enunciado.findById( enunciadoID );

        if ( !enunciado ) {
            return res.status(404).json({
                ok: false,
                msg: 'El enunciado no existe'
            });
        }

        enunciado.status = !enunciado.status;

        await enunciado.save();

        res.status(200).json({
            ok: true,
            enunciado
        })

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });

    }
}

module.exports = {
    createEnunciado,
    updateEnunciado,
    deleteEnunciado
}