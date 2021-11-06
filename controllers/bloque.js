const { response } = require("express");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const BloqueSchema = require("../models/bloque");
const HorarioSchema = require("../models/horario");



const newBloque = async(req, res = response) => {
    try {
        const {idHorario:_id,conexion} = req.body;
        let conn = obtenerConexion(conexion);
        let Horario = obtenerModelo('Horario', HorarioSchema, conn);
        let Bloque = obtenerModelo('Bloque', BloqueSchema, conn);
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const verificarHorario = await Horario.findOne({_id,anio});
        if(!verificarHorario){
            return res.status(404).json({
                ok:false,
                msg:'El horario no existe o no pertenece al año actual'
            })
        }
        const bloque = new Bloque(req.body);
        verificarHorario.bloques = [...verificarHorario.bloques, bloque._id];
        await bloque.save();
        await verificarHorario.save();

        res.status(200).json({
            ok:true,
            bloque
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}
const editBloque = async(req, res = response) => {
    try {
        const {conexion} = req.body;
        const {id} = req.params;
        let conn = obtenerConexion(conexion);
        let Bloque = obtenerModelo('Bloque', BloqueSchema, conn);
        const verificarBloque = await Bloque.findById(id);
        if(!verificarBloque){
            return res.status(404).json({
                ok:false,
                msg:'El bloque no existe'
            })
        }
        const bloque = await Bloque.findByIdAndUpdate(id,req.body,{new:true});

        res.status(200).json({
            ok:true,
            bloque
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}
const deleteBloque = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {conexion} = req.body;
        let conn = obtenerConexion(conexion);
        let Bloque = obtenerModelo('Bloque', BloqueSchema, conn);
        const verificarBloque = await Bloque.findById(id);
        if(!verificarBloque){
            return res.status(404).json({
                ok:false,
                msg:'El bloque no existe o no pertenece al año actual'
            })
        }
        await Bloque.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            msg:'Bloque eliminado'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}

module.exports = {
    newBloque,
    editBloque,
    deleteBloque
}