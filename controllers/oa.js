const { response } = require('express');
const OA = require('../models/oa');

const getOA = async ( req, res = response ) => {
    
    const oa = await OA.find();

    try {
        
        res.status(200).json({
            ok : true,
            oa
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const createOA = async ( req, res = response ) => {

    const oa = new OA( req.body );

    try {
        
        const oaSaved = await oa.save();

        res.status(201).json({
            ok: true,
            oa: oaSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const updateOA = async ( req, res = response ) => {

    const oaID = req.params.id;

    try {
        
        const oa = await OA.findById( oaID );

        if ( !oa ) {
            return res.status(404).json({
                ok: false,
                msg: 'OA no existe por ese id'
            });
        }

        const newOA = {
            ...req.body
        }

        const oaUpdated = await OA.findByIdAndUpdate( oaID, newOA, { new: true } );

        res.json({
            ok: true,
            oa: oaUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const deleteOA = async ( req, res = response ) => {

    const oaID = req.params.id;

    try {
        
        const oa = await OA.findById( oaID );

        if ( !oa ) {
            return res.status(404).json({
                ok: false,
                msg: 'OA no existe por ese id'
            });
        }

        oa.status = false;

        await oa.save();

        res.json({
            ok: true,
            msg: 'El OA se ha eliminado con éxito'
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
    getOA,
    createOA,
    updateOA,
    deleteOA
}

