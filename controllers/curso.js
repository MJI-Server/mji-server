const { response } = require('express');
const Curso = require('../models/curso');

const getCursos = async ( req, res = response ) => {

    const cursos = await Curso.find();

    try {
        
        res.status(200).json({
            ok: true,
            cursos
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const crearCurso = async ( req, res = response ) => {

    const curso = new Curso( req.body );

    try {
        
        const cursoGuardado = await curso.save();

        res.status(200).json({
            ok: true,
            curso: cursoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarCurso = async ( req, res = response ) => {

    const cursoID = req.params.id;

    try {
        
        const curso = await Curso.findById( cursoID );

        if( !curso || curso.status===false ){
            return res.status(404).json({
                ok: false,
                msg: 'Curso no existe por ese id'
            });
        }

        const nuevoCurso = {
            ...req.body
        }

        const cursoActualizado =  await Curso.findByIdAndUpdate( cursoID, nuevoCurso, { new: true } );

        res.json({
            ok: true,
            curso: cursoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarCurso = async ( req, res = response ) => {

    const cursoID = req.params.id;

    try {
        
        const curso = await Curso.findById( cursoID );

        if ( !curso || curso.status === false ) {
            return res.status(404).json({
                ok: false,
                msg: 'El Curso no existe por ese id'
            });
        }

        curso.status = false;

        await curso.save();

        res.status(200).json({
            ok: true,
            msg: 'El curso se ha eliminado con éxito'
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
    getCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}
