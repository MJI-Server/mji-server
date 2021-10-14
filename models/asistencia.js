const { Schema, model } = require('mongoose');

const AsistenciaSchema = Schema({
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    idCurso:{
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    idColegio:{
        type:Schema.Types.ObjectId,
        ref:'Colegio',
        required:true
    },
    fecha: {
        type: Date,
        required:true
    },
    year: {
        type: Number,
        required:true
    },
    asistencia: {
        type: String,
        enum:['Presente','Ausente','Retraso','Justificado'],
        required:true
    }
});

AsistenciaSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = AsistenciaSchema;