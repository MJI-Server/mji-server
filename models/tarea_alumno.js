const {Schema} = require('mongoose');

const Tarea_AlumnoSchema = new Schema ({
    idCurso: {
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:true
    },
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref:'UsuarioSchema',
        required:true
    },
    idAsignatura: {
        type:Schema.Types.ObjectId,
        ref:'Asignatura',
        required:true
    },
    idUnidad: {
        type:Schema.Types.ObjectId,
        ref:'Unidad',
        required:true
    },
    idTarea:{
        type:Schema.Types.ObjectId,
        ref:'Tarea',
        required:true
    },
    seleccionItems: [{
        type: Schema.Types.ObjectId,
        ref:'Item',
        required: true
    }],
    isFinished: {
        type: Boolean,
        default: true
    }
})

Tarea_AlumnoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = Tarea_AlumnoSchema;