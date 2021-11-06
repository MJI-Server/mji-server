const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const dbConection = require('../db/dbconection');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.server=http.createServer(this.app);
        this.auth = '/api/auth';
        this.curso = '/api/curso';
        this.asignatura = '/api/asignatura';
        this.unidad = '/api/unidad';
        this.oa = '/api/oa';
        this.usuarios = '/api/usuarios';
        this.colegio = '/api/colegio';
        this.asistencia = '/api/asistencia';
        this.material = '/api/material';
        this.notasAlumno = '/api/notasAlumno';
        this.notas = '/api/notas';
        this.tareas = '/api/tareas';
        this.tareaAlumno = '/api/tareaAlumno';
        this.enunciados = '/api/enunciados';
        this.items = '/api/items';
        this.prueba = '/api/prueba';
        this.pruebaAlumno = '/api/pruebaAlumno';
        dbConection();
    }

   

    middlewares() {
        const corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200
          }
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        // this.app.use((req, res, next) => {
        //     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        //     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //     next();
        // });
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use(express.json());
        this.app.use(cors(corsOptions));
        this.app.use(this.auth,require('../routes/auth'));
        this.app.use(this.curso,require('../routes/curso'));
        this.app.use(this.asignatura,require('../routes/asignatura'));
        this.app.use(this.unidad,require('../routes/unidad'));
        this.app.use(this.oa,require('../routes/oa'));
        this.app.use(this.usuarios,require('../routes/usuarios'));
        this.app.use(this.colegio,require('../routes/colegio'));
        this.app.use(this.asistencia,require('../routes/asistencia'));
        this.app.use(this.material,require('../routes/material'));
        this.app.use(this.notasAlumno,require('../routes/nota_alumno'));
        this.app.use(this.notas,require('../routes/nota'));
        this.app.use(this.tareas,require('../routes/tarea'));
        this.app.use(this.tareaAlumno,require('../routes/tarea_alumno'));
        this.app.use(this.enunciados,require('../routes/enunciado'));
        this.app.use(this.items,require('../routes/item'));
        this.app.use(this.prueba,require('../routes/prueba'));
        this.app.use(this.pruebaAlumno,require('../routes/prueba_alumno'));
        
       
    }

    init(){
        this.middlewares();
        this.server.listen(this.port, ()=>{
            console.log(`Server corriendo en el puerto : ${this.port}`)
        })
    }

}

module.exports = Server;