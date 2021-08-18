const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { response } = require("express");

const getUsuarios = async(req,res=response)=>{
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({
            ok:true,
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error del servidor'
      });
    }
}
const newUsuario = async(req,res=response)=>{
    try {
        try {
            const {email, password} = req.body;
            const verificarUsuario = await Usuario.findOne({email});
            if(verificarUsuario){
                return res.json({
                    ok:false,
                    msg:'El email ya existe'
                });
            };
            const usuario = new Usuario(req.body);
            const salt = bcrypt.genSaltSync(1);
            usuario.password = bcrypt.hashSync(password,salt);
          
            await usuario.save();
            res.status(200).json({
                ok:true,
                usuario,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok:false,
                msg:'Error del servidor'
            });
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Error del servidor'
        });
    }
}
const editUsuario = async(req,res=response)=>{
    try {
        const id = req.params.id;
        const verificarUsuario = await Usuario.findById(id);
        if(!verificarUsuario){
            return res.json({
                ok:false,
                msg:'El usuario no existe'
            });
        };
        const newUsuario = await Usuario.findByIdAndUpdate(id, req.body, {new:true});
        
        res.status(200).json({
            ok:true,
            usuario:newUsuario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error del servidor'
        });
    }
}

const deleteUsuario = async(req,res=response)=>{

        try {
            const id = req.params.id;
            const verificarUsuario = await Usuario.findById(id);
            if(!verificarUsuario){
                return res.json({
                    ok:false,
                    msg:'El usuario no existe'
                });
            };
            verificarUsuario.status = false;
            await verificarUsuario.save();
            
            res.status(200).json({
                ok:true,
                msg:'Usuario eliminado'
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
    getUsuarios,
    newUsuario,
    editUsuario,
    deleteUsuario
}