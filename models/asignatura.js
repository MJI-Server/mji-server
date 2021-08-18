const { Schema, model } = require('mongoose');

const asignaturaSchema = Schema({
    idCurso : {
        type : Schema.Types.ObjectId,
        ref : 'Curso',
        required : true
    },
    asignatura : {
        type : String,
        required : true
    },
    unidades : [{
        type : Schema.Types.ObjectId,
        ref : 'Unidades',
    }],
    status: {
        type: Boolean,
        default: true
    }
});

asignaturaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Asignatura', asignaturaSchema);