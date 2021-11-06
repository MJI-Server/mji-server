const { Schema } = require('mongoose');

const HorarioSchema = Schema({
    bloques: [{
        type:Schema.Types.ObjectId,
        ref:'Bloque',
        required:false
    }],
    anio: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

HorarioSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = HorarioSchema;