const {Schema} = require('mongoose');

const StreamSchema = new Schema ({
    idCurso: {
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    admin: {
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    urlModerador: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    endUrl: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required:true
    }
})

StreamSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = StreamSchema;