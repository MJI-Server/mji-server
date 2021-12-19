const {Schema} = require('mongoose');

const EnunciadoSchema = new Schema({
    idTarea : {
        type: Schema.Types.ObjectId,
        ref: 'Tarea',
        required: true
    },
    enunciado: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }],
    status: {
        type: Boolean,
        default: true
    }
})


module.exports = EnunciadoSchema;