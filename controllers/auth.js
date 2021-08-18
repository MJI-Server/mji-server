const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const login = async(req, res=response) => {
    try {
        const {email, password} = req.body;
        const usuario = await Usuario.findOne({email});
        if(!usuario || usuario.status === false){
            return res.status(401).json({
                ok:false,
                msg:'El usuario no existe o no pertenece a la organización'
            });
        };
        const verificar = bcrypt.compareSync(password,usuario.password);
        if(!verificar){
            return res.status(401).json({
                ok:false,
                msg:'Usuario no autorizado'
            });
        }
        const token = await  generarJWT(usuario._id, usuario.email);
        res.status(200).json({
            ok:true,
            usuario,
            token
        })
    } catch (error) {
        
    }
}
const register = async(req, res=response) => {
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
        const token = await  generarJWT(usuario._id, usuario.email);

        res.status(200).json({
            ok:true,
            usuario,
            token
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
    login,
    register
}
