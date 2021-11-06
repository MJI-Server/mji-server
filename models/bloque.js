const { Schema } = require('mongoose');

const BloqueSchema = Schema({
    idHorario: {
        type:Schema.Types.ObjectId,
        ref:'Horario',
        required:true
    },
    idCurso: {
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    idUsuario: {
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    idAsignatura: {
        type:Schema.Types.ObjectId,
        ref:'Asignatura',
        required:true
    },
    dia: {
        type: String,
        required: true
    },
    bloque: [{
        type: Number,
        required: true
    }],
    status: {
        type: Boolean,
        default: true
    }
});

BloqueSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = BloqueSchema;