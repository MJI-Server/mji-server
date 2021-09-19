const Asistencia = require("../models/asistencia");
const { response } = require("express");
const Usuario = require("../models/usuario");


const newAsistencia = async(req,res=response)=>{
  
        try {
            const usuario = await Usuario.findById(req.body.idUsuario);
            if(!usuario){
                return res.status(400).json({
                    ok:false,
                    msg:'El usuario no existe'
                })
            }
            const asistencia = new Asistencia(req.body);
          
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
    changeAsistencia
}