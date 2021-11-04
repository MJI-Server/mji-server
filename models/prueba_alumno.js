const { Schema, model } = require('mongoose');

const prueba_alumnoSchema = Schema({
    idColegio: {
        type:Schema.Types.ObjectId,
        ref:'Colegio',
        required:true
    },
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
    idPrueba: {
        type:Schema.Types.ObjectId,
        ref:'Prueba',
        required:true
    },
    idUsuario: {
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    prueba: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    status: {
        type: Boolean,
        default: true
    }
});

prueba_alumnoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = prueba_alumnoSchema;