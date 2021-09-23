const {model, Schema} = require('mongoose');


const UsuarioSchema = new Schema({
    idCurso:{
        type:Schema.Types.ObjectId,
        ref:'Curso',
        required:false
    },
    idColegio:{
        type:Schema.Types.ObjectId,
        ref:'Colegio',
        required:true
    },
    nombre:{
        type:String,
        required:false
    },
    apellidoP:{
        type:String,
        required:false
    },
    apellidoM:{
        type:String,
        required:false
    },
    run:{
        type:String,
        required:false
    },
    usuario:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    direccion:{
        type:String,
        required:false
    },
    genero:{
        type:String,
        required:false,
        enum:['M','F']
    },
    role:{
        type:String,
        default:'USUARIO'
    },
    status:{
        type:Boolean,
        default:true
    }
});

module.exports = model('Usuario',UsuarioSchema);