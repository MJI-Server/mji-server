const {model, Schema} = require('mongoose');

const TareaSchema = new Schema({
    idUnidad: {
        type:Schema.Types.ObjectId,
        ref:'Unidad',
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
        required: true
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

module.exports = model('Tarea', TareaSchema );