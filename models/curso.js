const { Schema, model } = require('mongoose');

const cursoSchema = Schema({
    letra: {
        type: String,
        required: true
    },
    asignaturas: [{
        type: Schema.Types.ObjectId,
        ref: 'Asignatura'
    }],
    curso: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

cursoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Curso', cursoSchema );