const { response } = require('express');
const OA = require('../models/oa');
const Unidad = require('../models/unidad');

const getOA = async ( req, res = response ) => {
    
    
    try {
        const oas = await OA.find().populate({path:'idUnidad', populate:{path:'idAsignatura', populate:{path:'idCurso'}}});
        
        res.status(200).json({
            ok : true,
            oas
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
        await oa.save();


        res.status(200).json({
            ok: true,
            oa
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

        const oaUpdated = await OA.findByIdAndUpdate( oaID, newOA, { new: true } ).populate('idUnidad').populate({path:'idUnidad', populate:{path:'idAsignatura', populate:{path:'idCurso'}}});

        res.status(200).json({
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
        
        const oa = await OA.findById( oaID ).populate('idUnidad').populate({path:'idUnidad', populate:{path:'idAsignatura', populate:{path:'idCurso'}}});

        if ( !oa ) {
            return res.status(404).json({
                ok: false,
                msg: 'OA no existe por ese id'
            });
        }
      

        oa.status = !oa.status ;

        await oa.save();

        res.status(200).json({
            ok: true,
            oa
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

