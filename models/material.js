const { Schema, model } = require('mongoose');

const materialSchema = Schema({
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
    idUnidad: {
        type:Schema.Types.ObjectId,
        ref:'Unidad',
        required:true
    },
    material: {
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

materialSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = materialSchema;