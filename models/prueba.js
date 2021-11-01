const { Schema } = require('mongoose');

const pruebaSchema = Schema({
    idCurso: {
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    idAsignatura: {
        type:Schema.Types.ObjectId,
        ref:'Asignatura',
        required:true
    },
    idUnidad: {
        type:Schema.Types.ObjectId,
        ref:'Unidad',
        required:true
    },
    instrucciones: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    inicio: {
        type: Date,
        required:true
    },
    termino: {
        type: Date,
        required:true
    },
    status: {
        type: Boolean,
        default: true
    },

});

pruebaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = pruebaSchema;