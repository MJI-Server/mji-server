const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 15,
  bufferMaxEntries: 0,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 30000
};

const crearConexion = (dbName) => {
  const uri = `${process.env.DB_CNN}/${dbName}?retryWrites=true&w=majority`;
  return mongoose.createConnection(uri, options);
}

const obtenerConexion = (dbName) => {
  let [ conexion ] = mongoose.connections.filter(conn => conn.name === dbName);
  if(!conexion) {
    conexion = crearConexion(dbName);
  }
  return conexion;
}

module.exports = obtenerConexion;