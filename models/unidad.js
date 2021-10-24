const {model, Schema} = require('mongoose');

const unidadSchema = new Schema({
    idAsignatura : {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    codUnidad : {
        type: String,
        required: true,
    },
    codAsignatura : {
        type: String,
        required: true
    },
    proposito : {
        type: String,
        required: true
    },
    conocimientosPrevios : [{
        type: String,
        required: false
    },],
    palabrasClaves : [{
        type: String,
        required: false
    },],
    unidad : {
        type: String,
        required: true
    },
    oas: [{
        type: Schema.Types.ObjectId,
        ref: 'OA'
    }],
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = model('Unidad', unidadSchema);