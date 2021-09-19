const {model, Schema} = require('mongoose');

const ItemSchema = Schema({

    idEnunciado: {
        type: Schema.Types.ObjectId,
        ref: 'Enunciado',
        required: true
    },
    item: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }

})

ItemSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Item', ItemSchema );