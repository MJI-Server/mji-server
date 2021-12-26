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
const newAsistencia = async(req,res=response)=>{
  
        try {
            const {id:idUsuario} = req.params;
            const {conexion} = req.body; 
            let conn = obtenerConexion(conexion);
            let Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);
            let Asistencia = obtenerModelo('Asistencia', AsistenciaSchema, conn);
            const usuario = await Usuario.findById(idUsuario);

            const fecha = req.body.fecha;

            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no existe'
                })
            }
            const asistencia = new Asistencia({
                idUsuario,
                idCurso:usuario.idCurso,
                fecha,
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
    getAsistencia
}