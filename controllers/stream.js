const bbb = require('bigbluebutton-js')
const { response } = require('express')
const obtenerConexion = require('../db/conexiones')
const obtenerModelo = require('../db/modelos')
const StreamSchema = require('../models/stream')
const UsuarioSchema = require('../models/usuario')
 
let api = bbb.api(
    process.env.BBB_URL, 
    process.env.BBB_SECRET
  )
let http = bbb.http
 

let meetingCreateUrl = api.administration.create('My Meeting', '1', {
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

const createServer =async (req, res = response )=>{
    try {
        const {nombre,_id}=req.usuario;
        const {idCurso}=req.body;
    console.log(nombre);
  const result = await http(meetingCreateUrl);
  const {returncode}=result;
  let moderatorUrl = api.administration.join(nombre, '1', 'supersecret')

 
  let meetingEndUrl = api.administration.end('1', 'supersecret')
  let userUrl = api.administration.join('attend', '1', 'secret')
  if(returncode=='SUCCESS'){
      let conn = obtenerConexion(req.body.conexion);
      let Stream = obtenerModelo('Stream', StreamSchema, conn);
      const newStream = new Stream({
          idCurso,
          admin:_id,
          urlModerador:moderatorUrl,
          url:userUrl,
          endUrl:meetingEndUrl,
          fecha:Date.now()
      });
      await newStream.save();
  }


  console.log(`End meeting link: ${meetingEndUrl}`)

  res.json({
      ok:true,
      result:result,
      urlAdmin:moderatorUrl,
      end:meetingEndUrl
  })
    } catch (error) {
        console.log(error)
        res.json({
            ok:false
        })
    }
}

const getStream =async (req, res = response )=>{
    try {
      const {idCurso}=req.body;
      const {role,nombre,_id}=req.usuario;


      let conn = obtenerConexion(req.body.conexion);
      let Stream = obtenerModelo('Stream', StreamSchema, conn);
      let stream='';
      if(role==='DOCENTE'){
        stream =await Stream.findOne({admin:_id});
      }else{
        stream =await Stream.findOne({idCurso});
      }
      let moderatorUrl = api.administration.join(nombre, '1', 'supersecret')
      let userUrl = api.administration.join(nombre, '1', 'secret')
      if(!stream){
       return res.json({
            ok:false,
        })
      }
      if(role==='DOCENTE'){
          
        return res.json({
          ok:true,
          url:moderatorUrl,
          endUrl:stream.endUrl
      })
      }else{
        return res.json({
          ok:true,
          url:userUrl
      })
    }
    } catch (error) {
        console.log(error)
        res.json({
            ok:false
        })
    }
}
const deleteStream =async (req, res = response )=>{
    try {
      const {_id}=req.usuario;
      let conn = obtenerConexion(req.body.conexion);
      let Stream = obtenerModelo('Stream', StreamSchema, conn);
      const stream =await Stream.findOne({admin:_id});
      if(!stream){
       return res.json({
            ok:false,
        })
      }
      await Stream.findOneAndDelete(stream.id);

      return res.json({
        ok:true,
      })
    } catch (error) {
        console.log(error)
        res.json({
            ok:false
        })
    }
}

module.exports={
    createServer,
    getStream,
    deleteStream
}