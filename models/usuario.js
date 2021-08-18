const {model, Schema} = require('mongoose');


const UsuarioSchema = new Schema({
    nombre:{
        type:String,
        required:false
    },
    apellido:{
        type:String,
        required:false
    },
    usuario:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
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