const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT = async(req, res=response, next)=>{
    try {
        const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'El token no existe'
        });
    }
    const {uid} = jwt.verify(token, process.env.CLAVE_SECRETA);
    if(!uid){
        return res.status(401).json({
            ok:false,
            msg:'El token no es valido'
        });
    };
    const usuario = await Usuario.findById(uid);
    if(!usuario || usuario.status === false){
        return res.status(401).json({
            ok:false,
            msg:'El usuario no existe o no pertenece a la organización'
        });
    }
    req.usuario = usuario;
    next();
    } catch (error) {
        console.log(error);
         res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        });
    }
}

module.exports = validarJWT;