const { response } = require("express");
const Asignatura = require("../models/asignatura");
const Colegio = require('../models/colegio');
const Curso = require('../models/curso');
const Unidad = require('../models/unidad');
const cursoExist = async(req,res =response, next)=>{
    const {idCurso} = req.params;
    const curso = await Curso.findById(idCurso);
    if(!curso){
        return res.status(404).json({
            ok:false,
            msg:`El curso no existe`
        })
        
    }
    req.curso = `${curso.curso}-${curso.letra}`;
    next();

}
const colegioExist = async(req,res =response, next)=>{
    const {idColegio} = req.params;
    const colegio = await Colegio.findById(idColegio);
    if(!colegio){
        return res.status(404).json({
            ok:false,
            msg:`El colegio no existe`
        })
    }
    req.colegio = colegio.nombre;
    next();
    }
const asignaturaExist = async(req,res =response, next)=>{
    const {idAsignatura} = req.params;
    const asignatura = await Asignatura.findById(idAsignatura);
    if(!asignatura){
        return res.status(404).json({
            ok:false,
            msg:`La asignatura no existe`
        })
    }
    req.asignatura = asignatura.asignatura;
    next();
    }
const unidadExist = async(req,res =response, next)=>{
    const {idUnidad} = req.params;
    const unidad = await Unidad.findById(idUnidad);
    if(!unidad ){
        return res.status(404).json({
            ok:false,
            msg:`La unidad no existe`
        })
        
    } 
    req.unidad = unidad.unidad;
    next();          
}
module.exports = {
    asignaturaExist,
    cursoExist,
    colegioExist,
    unidadExist
    }