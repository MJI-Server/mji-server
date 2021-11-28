const {model, Schema} = require('mongoose');

const TareaSchema = new Schema({
    idUnidad: {
        type:Schema.Types.ObjectId,
        ref:'Unidad',
        required:true
    },
    idAsignatura: {
        type:Schema.Types.ObjectId,
        ref:'Asignatura',
        required:true
    },
    idCurso: {
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    titulo:{
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true
    },
    enunciados: [{
        type: Schema.Types.ObjectId,
        ref: 'Enunciado',
        required: false
    }],
    dateInit: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

TareaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = TareaSchema;