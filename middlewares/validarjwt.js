const { response } = require("express");
const jwt = require("jsonwebtoken");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const Curso = require("../models/curso");
const UsuarioSchema = require("../models/usuario");


const validarJWT = async(req, res=response, next)=>{
    try {
    const token = req.header('x-token');
    const {conexion,administrador} = req.body;
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
    let conn;
    let Usuario;

    if(administrador){
         conn = obtenerConexion('MJIServer');
         Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);
    }else{
        conn = obtenerConexion(conexion);
        Usuario = obtenerModelo('Usuario', UsuarioSchema, conn);
    }
    const usuario = await Usuario.findById(uid);
    if(!usuario || usuario.status === false){
        return res.status(401).json({
            ok:false,
            msg:'El usuario no existe o no pertenece a la organización'
        });
    }
    const curso = await Curso.findById(usuario.idCurso).populate({path:'asignaturas', populate:{path:'unidades', populate:{path:'oas'}}});
    usuario.idCurso = curso;
    req.usuario = usuario;
    next();
    } catch (error) {
        console.log('Token expirado');
         res.status(500).json({
            ok:false,
            msg:'Error en el servidor'
        });
    }
}

module.exports = validarJWT;