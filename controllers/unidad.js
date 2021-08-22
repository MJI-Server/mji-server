const { response } = require('express');
const Unidad = require('../models/unidad');

const getUnidades = async ( req, res =  response ) => {
    
    const unidad = await Unidad.find();

    try {
        
        res.status(200).json({
            ok : true,
            unidad
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const createUnidades = async ( req, res =  response ) => {

    const unidad = new Unidad( req.body )

    try {
        
        const unidadSaved = await unidad.save();

        res.status(201).json({
            ok: true,
            unidad: unidadSaved
        })

    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const updatetUnidades = async ( req, res =  response ) => {

    const unidadID = req.params.id;

    try {
        
        const unidad = await Unidad.findById( unidadID );

        if ( !unidad ) {

            return res.status(404).json({
                ok: false,
                msg: 'Unidad no existe por ese id'
            });
    
        }

        const newUnidad = {
            ...req.body
        }

        const unidadUpdated = await Unidad.findByIdAndUpdate( unidadID, newUnidad, { new : true } );

        res.json({
            ok: true,
            unidad: unidadUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteUnidades = async ( req, res =  response ) => {

    const unidadID = req.params.id;
    
    try {
        
        const unidad = await Unidad.findById( unidadID );

        if ( !unidad ) {

            return res.status(404).json({
                ok: false,
                msg: 'Unidad no existe por ese id'
            });
    
        }

        unidad.status = false;

        await unidad.save();

        res.json({
            ok: true,
            msg: 'La unidad se ha eliminado con éxito'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getUnidades,
    createUnidades,
    updatetUnidades,
    deleteUnidades
}
