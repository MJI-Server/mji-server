const { response } = require('express');
const Asignatura = require('../models/asignatura');
const Curso = require('../models/curso');


const getAsignaturas = async ( req, res =  response ) => {
    
    
    try {
        
        const asignaturas = await Asignatura.find().populate('idCurso');
        res.status(200).json({
            ok : true,
            asignaturas
        })

    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

}

const crearAsignatura = async ( req, res = response ) => {
    const {grado,asignatura:nombre} = req.body;
    const asignatura = new Asignatura( req.body );

    try {
        const verificar = await Asignatura.findOne({grado,asignatura:nombre});
        const curso = await Curso.findOne({grado});
        const cursos = await Curso.find({grado});
        if(verificar ){
            return res.status(401).json({
                ok:false,
                msg:'Ya existe asignatura'
            });
        };
        if(!curso ){
            return res.status(401).json({
                ok:false,
                msg:'No existe curso'
            });
        };
        asignatura.idCurso = curso._id;
        await asignatura.save();
        const promesas = cursos.map(c => {
            c.asignaturas = [...c.asignaturas, asignatura.id];
            c.save();
        });
        await Promise.all(promesas);

        asignatura.idCurso = curso;

        res.status(200).json({
            ok: true,
            asignatura
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const actulizarAsignatura = async ( req, res = response ) => {

    const asignaturaID = req.params.id;

    try {
        
        const asignatura = await Asignatura.findById( asignaturaID );

        if ( !asignatura ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura no existe'
            });
        }
    

        
        const nuevaAsignatura = {
            ...req.body
        }

        const asignaturaUpdated = await Asignatura.findByIdAndUpdate( asignaturaID, nuevaAsignatura, { new: true } ).populate('idCurso');

        res.status(200).json({
            ok: true,
            asignatura: asignaturaUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const eliminarAsignatura = async ( req, res = response ) => {

    const asignaturaID = req.params.id;

    try {
        
        const asignatura = await Asignatura.findById( asignaturaID ).populate('idCurso');

        if ( !asignatura ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura no existe'
            });
        }
        
        

        asignatura.status = !asignatura.status;

        await asignatura.save();

        res.status(200).json({
            ok: true,
            asignatura
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getAsignaturas,
    crearAsignatura,
    actulizarAsignatura,
    eliminarAsignatura
}