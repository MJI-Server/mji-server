const { response } = require('express');
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const cursoProfesorSchema = require('../models/cursoProfesor');
const Curso = require('../models/curso');
const Asignatura = require('../models/asignatura');
const UsuarioSchema = require('../models/usuario');
const NotaSchema = require('../models/nota');

const getCursosProfesor = async ( req, res = response ) => {

    const { idUsuario } = req.body;
    
    try {
        
        let conn = obtenerConexion(req.body.conexion);
        let CursoProfesor = obtenerModelo('CursoProfesor', cursoProfesorSchema, conn );

        const cursoProfesor = await CursoProfesor.find({ idUsuario }).populate({ path: 'idCurso', model: Curso, select: 'letra grado curso'}).populate({path: 'idAsignatura', model: Asignatura, select: 'codAsignatura grado asignatura idCurso'});

        res.status(200).json({
            ok: true,
            cursoProfesor
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })   
    }

}

const getUsuariosProfesor = async ( req, res = response ) => {

    const { idCurso } = req.body;
    
    try {

        let conn = obtenerConexion(req.body.conexion);
        let UsuarioProfesor = obtenerModelo('Usuario', UsuarioSchema, conn );

        const usuariosProfesor = await UsuarioProfesor.find({ idCurso });

        res.status(200).json({
            ok: true,
            usuariosProfesor
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        })   
    }

}

const getPruebasProfesor = async(req, res = response)=>{
    
    const {idUsuario,idAsignatura} = req.body;

    try {

        let conn = obtenerConexion(req.body.conexion);
        let Nota = obtenerModelo('Nota', NotaSchema, conn);
        const pruebasProfesor = await Nota.find({idUsuario,idAsignatura});
    
        res.status(200).json({
            ok:true,
            pruebasProfesor,
            // NotasAlumno
        });

 
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

const createCursoProfesor = async ( req, res = response ) => {

    let conn = obtenerConexion(req.body.conexion);
    let CursoProfesor = obtenerModelo( 'CursoProfesor', cursoProfesorSchema, conn );
    // Validar que no haya redundancia en la relación del docente con el curso 
    //cursoProfesor.findOne({idUsuario, idCurso}) Si hay un registro entonces no debe dejar crearlo
    const cursoProfesor = new CursoProfesor(req.body);

    const { idAsignatura, idCurso } = req.body;

    try {
        

        const asignatura = await Asignatura.findById( idAsignatura );
        const curso = await Curso.findById( idCurso );
        const isExistCursoProfesor = await cursoProfesor.findOne({idUsuario, idCurso});

        if ( !asignatura ) {
            return res.status(401).json({
                ok: false,
                msg: 'La asignatura no existe'
            })
        }

        if ( !curso ) {
            return res.status(401).json({
                ok: false,
                msg: 'El curso no existe'
            })
        }

        if ( isExistCursoProfesor ) {
            return res.status(401).json({
                ok: false,
                msg: 'Este curso ya ha sido asignado al docente'
            })
        }

        const cursoProfesorSaved = await cursoProfesor.save();

        res.status(201).json({
            ok: true,
            cursoProfesor: cursoProfesorSaved
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }

}

const updateCursoProfesor =  async ( req, res = response ) => {

    const cursoProfesorID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let CursoProfesor = obtenerModelo( 'CursoProfesor', cursoProfesorSchema, conn );

    try {

        const cursoProfesor = await CursoProfesor.findById( cursoProfesorID );

        if (!cursoProfesor) {
            return res.status(404).json({
                ok: false,
                msg: 'El curso del profesor no existe por ese id'
            })
        }

        const nuevoCurso = {
            ...req.body
        }

        const cursoProfesorUpdated = await CursoProfesor.findByIdAndUpdate( cursoProfesorID, nuevoCurso, { new: true } );

        res.json({
            ok: true,
            cursoProfesor: cursoProfesorUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el Servidor'
        }) 
    }

}

const deleteCursoProfesor = async ( req, res = response ) => {

    const cursoProfesorID = req.params.id;

    let conn = obtenerConexion(req.body.conexion);
    let CursoProfesor = obtenerModelo( 'CursoProfesor', cursoProfesorSchema, conn );
    
    try {

        const cursoProfesor = await CursoProfesor.findById( cursoProfesorID );

        if (!cursoProfesor) {
            return res.status(404).json({
                ok: false,
                msg: 'El curso del profesor no existe por ese id'
            })
        }

        cursoProfesor.status = !cursoProfesor.status;

        await cursoProfesor.save();

        res.json({
            ok: true,
            cursoProfesor
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
    getCursosProfesor,
    getUsuariosProfesor,
    getPruebasProfesor,
    createCursoProfesor,
    updateCursoProfesor,
    deleteCursoProfesor
}