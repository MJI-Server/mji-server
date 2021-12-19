const {model, Schema} = require('mongoose');

const ItemSchema = Schema({

    idEnunciado: {
        type: Schema.Types.ObjectId,
        ref: 'Enunciado',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

})

module.exports = model('Item', ItemSchema );