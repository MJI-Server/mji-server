const { response } = require("express");
const { model } = require("mongoose");
const obtenerConexion = require("../db/conexiones");
const obtenerModelo = require("../db/modelos");
const BloqueSchema = require("../models/bloque");
const Curso = require("../models/curso");
const Asignatura = require("../models/asignatura");
const HorarioSchema = require("../models/horario");

const getHorario = async(req, res = response) => {
    try {
        const {conexion,idCurso} = req.body;
        let conn = obtenerConexion(conexion);
        let Horario = obtenerModelo('Horario', HorarioSchema, conn);
        const hoy = new Date();
        const anio = hoy.getFullYear();
        let Bloque = obtenerModelo('Bloque', BloqueSchema, conn);
        const horario = await Horario.findOne({anio});
         
        if(!horario){
            return res.status(404).json({
                ok:false,
                msg:'El horario no esta definido para el año actual'
            });
        }

        const bloques = await Bloque.find({idHorario:horario.id,idCurso})
        .populate({path:'idCurso', select:'curso letra', model:Curso})
        .populate({path:'idAsignatura',select:'asignatura', model:Asignatura})
        .populate({path:'idUsuario', select:'nombre'});
        horario.bloques = bloques;

        res.status(200).json({
            ok:true,
            horario
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}
const newHorario = async(req, res = response) => {
    try {
        const {conexion,anio} = req.body;
        let conn = obtenerConexion(conexion);
        let Horario = obtenerModelo('Horario', HorarioSchema, conn);
        const verificarHorario = await Horario.findOne({anio});
        if(verificarHorario){
            return res.status(404).json({
                ok:false,
                msg:'Ya existe un horario para este año'
            })
        }
        const horario = new Horario(req.body);
        await horario.save();

        res.status(200).json({
            ok:true,
            horario
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}
const editHorario = async(req, res = response) => {
    try {
        const {conexion} = req.body;
        const {id} =  req.params;
        let conn = obtenerConexion(conexion);
        let Horario = obtenerModelo('Horario', HorarioSchema, conn);

        const verificarHorario = await Horario.findById(id);
        if(!verificarHorario){
            return res.status(404).json({
                ok:false,
                msg:'No existe un horario con el id solicitado'
            })
        }
        const horario = await Horario.findByIdAndUpdate(id, req.body,{new:true});

        res.status(200).json({
            ok:true,
            horario
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador a cargo'
        });
    }
}

module.exports = {
    getHorario,
    newHorario,
    editHorario
}