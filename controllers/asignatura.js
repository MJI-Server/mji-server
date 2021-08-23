const { response } = require('express');
const Asignatura = require('../models/asignatura');
const Curso = require('../models/curso');


const getAsignaturas = async ( req, res =  response ) => {
    
    
    try {
        
        const asignaturas = await Asignatura.find();
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
    const {idCurso} = req.body;
    const asignatura = new Asignatura( req.body );

    try {
        const curso = await Curso.findById(idCurso);
        if(!curso || curso.status === false){
            res.status(401).json({
                ok:false,
                msg:'No existe curso'
            });
        };
        
        await asignatura.save();
        curso.asignaturas = [...curso.asignaturas, asignatura.id];
        await curso.save();

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

        const asignaturaUpdated = await Asignatura.findByIdAndUpdate( asignaturaID, nuevaAsignatura, { new: true } );

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
        
        const asignatura = await Asignatura.findById( asignaturaID );

        if ( !asignatura ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura no existe o no esta disponible'
            });
        }
        if ( asignatura.status === false ) {

            return res.status(404).json({
                ok: false,
                msg: 'La asignatura ya esta dada de baja'
            });
        }
        

        asignatura.status = false;

        await asignatura.save();

        res.status(200).json({
            ok: true,
            msg: 'La asignatura se ha eliminado con éxito'
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