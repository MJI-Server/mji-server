const { Schema, model } = require('mongoose');

const colegioSchema = Schema({
    rbd: {
        type: String,
        required: true
    },
    nombre: [{
        type: String,
        required:true
    }],
    status: {
        type: Boolean,
        default: false
    }
});

colegioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Colegio', colegioSchema );