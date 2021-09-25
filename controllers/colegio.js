const { response } = require('express');
const Colegio = require('../models/colegio');

const getColegios = async ( req, res = response ) => {

    const colegios = await Colegio.find();

    try {
        res.status(200).json({
            ok: true,
            colegios
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const crearColegio = async ( req, res = response ) => {

    const {rbd} = req.body;
    const colegio = new Colegio( req.body );
    
    try {
        
        const verificar = await Colegio.findOne({rbd});
        if(verificar){
            return res.status(404).json({
                ok:false,
                msg:'El colegio ya existe'
            });
        }
        await colegio.save();

        res.status(200).json({
            ok: true,
            colegio
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarColegio = async ( req, res = response ) => {

    const colegioID = req.params.id;

    try {
        
        const colegio = await Colegio.findById( colegioID );

        if( !colegio ){
            return res.status(404).json({
                ok: false,
                msg: 'El colegio no existe por ese id'
            });
        }

        const newColegio =  await Colegio.findByIdAndUpdate( colegioID, req.body, { new: true } );

        res.json({
            ok: true,
            colegio: newColegio
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarColegio = async ( req, res = response ) => {

    const colegioID = req.params.id;

    try {
        
        const colegio = await Colegio.findById( colegioID );

        if ( !colegio ) {
            return res.status(404).json({
                ok: false,
                msg: 'El colegio no existe por ese id'
            });
        }
      

        colegio.status = !colegio.status;

        await colegio.save();

        res.status(200).json({
            ok: true,
            colegio
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
    getColegios,
    crearColegio,
    actualizarColegio,
    eliminarColegio
}
