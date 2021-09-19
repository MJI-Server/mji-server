const { response } = require('express');
const Material = require('../models/material');


const crearMaterial = async ( req, res = response ) => {

    try {  
        const material = new Material(req.body);
        await material.save();
        res.status(200).json({
            ok: true,
            material
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarMaterial = async ( req, res = response ) => {

    
    try {
        const materialId = req.params.id;
        
        const material = await Material.findById( materialId );

        if( !material ){
            return res.status(404).json({
                ok: false,
                msg: 'Material no existe por ese id'
            });
        }

     

        const newMaterial =  await Material.findByIdAndUpdate( materialId, req.body, { new: true } );

        res.json({
            ok: true,
            material: newMaterial
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarMaterial = async ( req, res = response ) => {

    try {
        
        const materialId = req.params.id;
        
        const material = await Material.findById( materialId );

        if( !material ){
            return res.status(404).json({
                ok: false,
                msg: 'Material no existe por ese id'
            });
        }
      

        material.status = !material.status;

        await material.save();

        res.status(200).json({
            ok: true,
            material
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
    crearMaterial,
    actualizarMaterial,
    eliminarMaterial
}
