const Enunciado = require('../models/enunciado');
const Tarea = require('../models/tarea');
const { response } = require('express');

const getEnunciados = async ( req, res = response ) => {
    try {
        
        const enunciados = await Enunciado.find();
        res.status(200).json({
            ok: true,
            enunciados
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })

    }
}

const createEnunciado = async ( req, res = response ) => {

    const enunciado = new Enunciado( req.body )
    const { idTarea } = req.body;

    try {
        
        const tarea = await Tarea.findById( idTarea );

        if( !tarea ){
            return res.status(401).json({
                ok: false,
                msg: 'La tarea no existe'
            })
        }

        await enunciado.save();
        tarea.enunciados = [ ...tarea.enunciados, enunciado.id ];

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
    getEnunciados,
    createEnunciado,
    updateEnunciado,
    deleteEnunciado
}