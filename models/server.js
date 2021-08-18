const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const dbConection = require('../db/dbconection');

class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.server=http.createServer(this.app);
        this.auth = '/api/auth';
<<<<<<< HEAD
        this.curso = '/api/curso';
        this.asignatura = '/api/asignatura';
=======
        this.usuarios = '/api/usuarios';
>>>>>>> master
        dbConection();
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(this.auth,require('../routes/auth'));
<<<<<<< HEAD
        this.app.use(this.curso,require('../routes/curso'));
        this.app.use(this.asignatura,require('../routes/asignatura'));
=======
        this.app.use(this.usuarios,require('../routes/usuarios'));
>>>>>>> master
       
    }

    init(){
        this.middlewares();
        this.server.listen(this.port, ()=>{
            console.log(`Server corriendo en el puerto : ${this.port}`)
        })
    }

}

module.exports = Server;