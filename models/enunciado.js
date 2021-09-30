const {model, Schema} = require('mongoose');

const EnunciadoSchema = new Schema({
    idTarea : {
        type: Schema.Types.ObjectId,
        ref: 'Tarea',
        required: true
    },
    enunciado: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }],
    status: {
        type: Boolean,
        default: true
    }
})

EnunciadoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Enunciado', EnunciadoSchema);