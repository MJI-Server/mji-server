const { response } = require('express');
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const Nota_AlumnoSchema = require("../models/nota_alumno");
const Asignatura = require('../models/asignatura');
const NotaSchema = require('../models/nota');
const UsuarioSchema = require('../models/usuario');

const getNotasAlumno = async ( req, res = response ) => {

    const { idUsuario } = req.body;

    try {
        
        let conn = obtenerConexion(req.body.conexion);
        let Nota_Alumno = obtenerModelo('Nota_Alumno', Nota_AlumnoSchema, conn);

        let Nota = obtenerModelo('Nota', NotaSchema, conn);

        let Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);

        const notas_alumno = await Nota_Alumno.find({ idUsuario }).populate({path:'idNota', model: Nota, populate:{path: 'idUsuario', select:'nombre apellidoP apellidoM', model: Usuario}});

        res.status(200).json({
            ok: true,
            notas_alumno
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })   
    }
}

const createNotaAlumno =  async ( req, res = response ) => {

    let conn = obtenerConexion(req.body.conexion);
    let Nota_Alumno = obtenerModelo('Nota_Alumno', Nota_AlumnoSchema, conn);

    let Nota = obtenerModelo('Nota', NotaSchema, conn);
    
    const nota_alumno = new Nota_Alumno( req.body );

    const { idAsignatura } = req.body;

    const { idNota } = req.body;

    try {
        
        const asignatura = await Asignatura.findById( idAsignatura );

        const nota = await Nota.findById( idNota );

        if ( !asignatura ) {
            return res.status(401).json({
                ok: false,
                msg: 'La asignatura no existe'
            })
        }

        if ( !nota ) {
            return res.status(401).json({
                ok: false,
                msg: 'La nota no existe'
            })
        }

        const notaSaved = await nota_alumno.save();

        res.status(201).json({
            ok: true,
            nota_alumno: notaSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }
}

const updateNotaAlumno = async ( req, res = response ) => {

    const notaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Nota_Alumno = obtenerModelo('Nota_Alumno', Nota_AlumnoSchema, conn);

    try {
        
        const nota_alumno = await Nota_Alumno.findById( notaID );

        if (!nota_alumno) {
            return res.status(404).json({
                ok: false,
                msg: 'La nota no existe por ese id'
            })
        }

        const nuevaNota = {
            ...req.body
        }

        const notaUpdated = await Nota_Alumno.findByIdAndUpdate( notaID, nuevaNota, { new: true } )

        res.json({
            ok: true,
            nota_alumno: notaUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }
}

const deleteNotaAlumno = async ( req, res = response ) => {

    const notaID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let Nota_Alumno = obtenerModelo('Nota_Alumno', Nota_AlumnoSchema, conn);

    try {
        
        const nota_alumno = await Nota_Alumno.findById( notaID );

        if (!nota_alumno) {
            return res.status(404).json({
                ok: false,
                msg: 'La nota no existe por ese id'
            })
        }

        nota_alumno.status = !nota_alumno.status;

        await nota_alumno.save();

        res.json({
            ok: true,
            nota_alumno
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
    getNotasAlumno,
    createNotaAlumno,
    updateNotaAlumno,
    deleteNotaAlumno
}