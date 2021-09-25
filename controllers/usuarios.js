const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { response } = require("express");
const Colegio = require("../models/colegio");
const Curso = require("../models/curso");

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
        const {usuario, password, grado, letra, rbd} = req.body;
        const rbdSplit = rbd.split('-')[0];
        const colegio = await Colegio.findOne({rbd:rbdSplit});
        const curso = await Curso.findOne({letra,grado});
        console.log(curso)
        if(!colegio || !curso){
            return res.status(404).json({
                ok:false,
                msg:'El curso o colegio no existe' 
            })
        }
        const verificarUsuario = await Usuario.findOne({usuario});
        if(verificarUsuario){
            return res.json({
                ok:false,
                msg:'El usuario ya existe'
            });
        };
        const user = new Usuario(req.body);
        const salt = bcrypt.genSaltSync(1);
        user.password = bcrypt.hashSync(password,salt);
        user.idColegio = colegio._id;
        user.idCurso = curso._id;
        console.log(colegio);
        await user.save();
        res.status(200).json({
            ok:true,
            usuario:user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error del servidor'
        });
    }
}
const editUsuario = async(req,res=response)=>{
    try {
        const id = req.params.id;
        let {password, ...rest} = req.body;
        const verificarUsuario = await Usuario.findById(id);
        if(!verificarUsuario){
            return res.json({
                ok:false,
                msg:'El usuario no existe'
            });
        };
        console.log(rest)
        const salt = bcrypt.genSaltSync(1);
        password = bcrypt.hashSync(password,salt);
        
        const newUsuario = await Usuario.findByIdAndUpdate(id, {rest,password}, {new:true});
        
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
            
            verificarUsuario.status = !verificarUsuario.status;
            const usuario = await verificarUsuario.save();
            
            res.status(200).json({
                ok:true,
                usuario
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