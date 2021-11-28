const { Schema } = require('mongoose');

const NotaSchema = new Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idAsignatura:{
        type: Schema.Types.ObjectId,
        ref: 'Asignatura',
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
})

NotaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = NotaSchema; 