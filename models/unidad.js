const {model, Schema} = require('mongoose');

const unidadSchema = new Schema({
    idAsignatura : {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    unidad : {
        type: String,
        required: true
    },
    OA: [{
        type: Schema.Types.ObjectId,
        ref: 'OA'
    }],
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Unidad', unidadSchema);