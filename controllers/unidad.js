const { response } = require('express');
const Asignatura = require('../models/asignatura');
const Unidad = require('../models/unidad');

const getUnidades = async ( req, res =  response ) => {
    
    
    try {
        
        const unidades = await Unidad.find();
        res.status(200).json({
            ok : true,
            unidades
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
    const {idAsignatura} = req.body;

    try {
        const asignatura = await Asignatura.findById(idAsignatura);
        if(!asignatura){
            return res.status(401).json({
                ok:false,
                msg:'La asignatura no existe'
            });
        };
        await unidad.save();
        asignatura.unidades = [...asignatura.unidades, unidad._id];
        await asignatura.save();
        

        res.status(200).json({
            ok: true,
            unidad
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

        res.status(200).json({
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
        

        unidad.status = !unidad.status;

        await unidad.save();

        res.json({
            ok: true,
            unidad
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
