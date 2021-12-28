const AsistenciaSchema = require("../models/asistencia");
const { response } = require("express");
const UsuarioSchema = require("../models/usuario");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");


const getAsistencia = async(req,res=response)=>{
  
    try { 
            const {conexion,idUsuario} = req.body; 
            let conn = obtenerConexion(conexion);
            let Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);
            let Asistencia = obtenerModelo('Asistencia', AsistenciaSchema, conn);
            const year = 2021;
            const usuario = await Usuario.findById(idUsuario);
            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no existe'
                })
            }
            const asistencia = await  Asistencia.find({idUsuario,year});
            res.status(200).json({
                ok:true,
                asistencia,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error del servidor'
            });
        }
    
}

const getAsistenciaAlumnos = async(req,res=response)=>{
  
    try { 
            const {conexion, idCurso, fecha} = req.body; 
            let conn = obtenerConexion(conexion);
            let Asistencia = obtenerModelo('Asistencia', AsistenciaSchema, conn);
            const date = fecha.split('T')[0];
            const asistencia = await Asistencia.find({idCurso, date});
            if(!asistencia){
                return res.status(400).json({
                    ok:false,
                    msg:'No existen registros de asistencia'
                })
            }
            res.status(200).json({
                ok:true,
                asistencia,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error del servidor'
            });
        }
    
}

const newAsistencia = async(req,res=response)=>{
  
        try {
            const {id:idUsuario} = req.params;
            const {conexion} = req.body; 
            let conn = obtenerConexion(conexion);
            let Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);
            let Asistencia = obtenerModelo('Asistencia', AsistenciaSchema, conn);
            const usuario = await Usuario.findById(idUsuario);

            const fecha = req.body.fecha;

            const idCurso = req.body.idCurso;

            const date = fecha.split('T')[0];

            const asistenciaAlumno = await Asistencia.findOne({idUsuario, idCurso, date})

            if ( asistenciaAlumno ) {
                
                await Asistencia.findByIdAndUpdate( asistenciaAlumno._id, req.body, { new: true } )

                const asistUpdated = await Asistencia.findOne({idUsuario, idCurso, date})
                return res.status(200).json({
                    ok: true,
                    asistencia: asistUpdated,
                    msg: 'La asistencia del Alumno Actualizada'
                })
            }

            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no existe'
                })
            }

            const asistencia = new Asistencia({
                idUsuario,
                idCurso,
                fecha,
                date,
                year:req.body.year,
                asistencia:req.body.asistencia,
            });
          
            await asistencia.save();
            res.status(200).json({
                ok:true,
                asistencia,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error del servidor'
            });
        }
    
}
const changeAsistencia = async(req,res=response)=>{

        try {
            const id = req.params.id;
            const {conexion} = req.body;
            let conn = obtenerConexion(conexion);
            let Asistencia = obtenerModelo('Asistencia', AsistenciaSchema, conn);
            const verificarAsistencia = await Asistencia.findById(id);
            if(!verificarAsistencia){
                return res.json({
                    ok:false,
                    msg:'Datos erroneos'
                });
            };
            
            verificarAsistencia.presente = !verificarAsistencia.presente;
            const asistencia = await verificarAsistencia.save();
            
            res.status(200).json({
                ok:true,
                asistencia
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error del servidor'
            });
        }
   
}

module.exports = {
    newAsistencia,
    changeAsistencia,
    getAsistencia,
    getAsistenciaAlumnos,
}