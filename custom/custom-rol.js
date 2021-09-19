const Colegio = require('../models/colegio');
const Curso = require('../models/curso');
const Role = require('../models/role');
const Unidad = require('../models/unidad');

const customRol = async( role = '')=>{
    const validar = await Role.findOne({role});
    if(!validar){
        throw new Error(`El rol ${role} no existe`);
    }
}

const cursoExist = async(idCurso = '')=>{
    const curso = await Curso.findById(idCurso);
    if(!curso){
        throw new Error(`El curso no existe`);
    }
}
const colegioExist = async(idColegio = '')=>{
    const colegio = await Colegio.findById(idColegio);
    if(!colegio){
        throw new Error(`El colegio no existe`);
    }
    }
const unidadExist = async(idUnidad = '')=>{
    const unidad = await Unidad.findById(idUnidad);
    if(!unidad ){
        throw new Error(`La unidad no existe`);
    }           
}

module.exports = {
customRol,
cursoExist,
colegioExist,
unidadExist
}