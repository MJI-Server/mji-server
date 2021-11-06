const { response } = require('express');
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const NotaSchema = require('../models/nota');

const getNotas = async ( req, res = response ) => {

    const { idNota:_id } = req.body;

    try {
        
        let conn = obtenerConexion(req.body.conexion);
        let Nota = obtenerModelo('Nota', NotaSchema, conn);
        const notas = await Nota.find({ _id });

        res.status(200).json({
            ok: true,
            notas
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })   
    }
}

const createNota = async ( req, res = response ) => {

    let conn = obtenerConexion(req.body.conexion);
    let Nota = obtenerModelo('Nota', NotaSchema, conn);

    const nota = new Nota( req.body );

    try {
        
        const notaSaved = await nota.save();

        res.status(201).json({
            ok: true,
            nota: notaSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }
}

const updateNota = async ( req, res = response ) => {

    const notaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Nota = obtenerModelo('Nota', NotaSchema, conn);

    try {

        const nota = await Nota.findById( notaID );

        if (!nota) {
            return res.status(404).json({
                ok: false,
                msg: 'La nota no existe por ese id'
            })
        }
        
        const nuevaNota = {
            ...req.body
        }

        const notaUpdated = await Nota.findByIdAndUpdate( notaID, nuevaNota, { new: true } );

        res.json({
            ok: true,
            nota: notaUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }
}

const deleteNota = async ( req, res = response ) => {

    const notaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Nota = obtenerModelo('Nota', NotaSchema, conn);

    try {

        const nota = await Nota.findById( notaID );

        if (!nota) {
            return res.status(404).json({
                ok: false,
                msg: 'La nota no existe por ese id'
            })
        }

        nota.status = !nota.status;

        await nota.save();

        res.json({
            ok: true,
            nota
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })
    }
}

module.exports = {
    getNotas,
    createNota,
    updateNota,
    deleteNota
}