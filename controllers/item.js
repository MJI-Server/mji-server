const Item = require('../models/item');
const Enunciado = require('../models/enunciado');
const { response } = require('express');

const getItems = async ( req, res = response ) => {
    
    try {
        
        const items = await Item.find();

        res.status(200).json({
            ok: true,
            items
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

const createItem = async ( req, res = response ) => {

    const item = new Item( req.body );
    const { idEnunciado } = req.body;
    
    try {
        
        const enunciado = await Enunciado.findById( idEnunciado );
        if ( !enunciado ) {
            return res.status(401).json({
                ok: false,
                msg: 'El enunciado no existe'
            });
        }

        enunciado.items = [ ...enunciado.items, item.id ];
        await item.save();
        await enunciado.save();

        res.status(200).json({
            ok: true,
            item
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

const updateItem = async ( req, res = response ) => {
    
    const itemID = req.params.id;
    
    try {
        
        const item = await Item.findById( itemID );

        if ( !item ) {
            return res.status(404).json({
                ok: false,
                msg: 'El item no existe'
            });
        }

        const nuevoItem = {
            ...req.body
        }

        const itemUpdated = await Item.findByIdAndUpdate( itemID, nuevoItem, { new: true } );

        res.status(200).json({
            ok: true,
            item: itemUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
}

const deleteItem = async ( req, res = response ) => {
    
    const itemID = req.params.id;

    try {
        
        const item = await Item.findById( itemID );

        if ( !item ) {
            return res.status(404).json({
                ok: false,
                msg: 'El item no existe'
            });
        }

        item.status = !item.status;
        
        await item.save();

        res.status(200).json({
            ok: true,
            item
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        })
    }
}

module.exports = {
    getItems,
    createItem,
    updateItem,
    deleteItem
}