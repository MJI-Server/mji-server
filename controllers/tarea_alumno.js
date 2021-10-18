const { response } = require("express");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const Tarea_AlumnoSchema = require("../models/tarea_alumno");

const getTareaAlumno = async ( req, res = response ) => {

    const { idUsuario, idAsignatura } = req.body;

    try {
        let connPRE = obtenerConexion(req.body.conexion);
        let Tarea_Alumno = obtenerModelo('tarea_alumno', Tarea_AlumnoSchema, connPRE);
        const tareas_alumno = await Tarea_Alumno.find({idUsuario, idAsignatura});
        res.status(200).json({
            ok: true,
            tareas_alumno
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })
    }
}

const createTareaAlumno = async ( req, res = response ) => {

    
    try {       
        
        let connPRE = obtenerConexion(req.body.conexion);
        let Tarea_Alumno = obtenerModelo('tarea_alumno', Tarea_AlumnoSchema, connPRE);
        const tarea_alumno = new Tarea_Alumno( req.body );
        const tareaSaved = await tarea_alumno.save();

        res.status(201).json({
            ok: true,
            tarea_alumno: tareaSaved
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }

}

module.exports = {
    getTareaAlumno,
    createTareaAlumno,
}