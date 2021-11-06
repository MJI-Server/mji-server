const { Schema } = require('mongoose');

const Nota_AlumnoSchema = new Schema({
    idNota:{
        type: Schema.Types.ObjectId,
        ref: 'Nota',
        required: true
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idCurso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    idAsignatura: {
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        // required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

Nota_AlumnoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = Nota_AlumnoSchema; 