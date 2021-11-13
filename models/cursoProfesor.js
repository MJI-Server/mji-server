const { Schema } = require('mongoose');

const cursoProfesorSchema = new Schema ({
    idUsuario : {
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
    status: {
        type: Boolean,
        default: true
    }
})

cursoProfesorSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = cursoProfesorSchema