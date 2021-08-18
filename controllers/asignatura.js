const { response } = require('express');
const Asignatura = require('../models/asignatura');

const getAsignatura = async ( req, res = response ) => {

    const asignaturas = await Asignatura.find();

    try {
     
        res.json({
            ok: true,
            asignaturas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const crearAsignatura = async ( req, res = response ) => {

    const asignatura = new Asignatura( req.body );

    try {
        
        const asignaturaSaved = await asignatura.save();

        res.status(201).json({
            ok: true,
            asignatura: asignaturaSaved
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const actulizarAsignatura = async ( req, res = response ) => {

    const asignaturaID = req.params.id;

    try {
        
        const asignatura = await Asignatura.findById( asignaturaID );

        if ( !asignatura ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura no existe por ese id'
            });
        }

        
        const nuevaAsignatura = {
            ...req.body
        }

        const asignaturaUpdated = await Asignatura.findByIdAndUpdate( asignaturaID, nuevaAsignatura, { new: true } )

        res.json({
            ok: true,
            asignatura: asignaturaUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const eliminarAsignatura = async ( req, res = response ) => {

    const asignaturaID = req.params.id;

    try {
        
        const asignatura = await Asignatura.findById( asignaturaID );

        if ( !asignatura ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura no existe por ese id'
            });
        }

        asignatura.status = false;

        await asignatura.save();

        res.json({
            ok: true,
            msg: 'La asignatura se ha eliminado con éxito'
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
    getAsignatura,
    crearAsignatura,
    actulizarAsignatura,
    eliminarAsignatura
}