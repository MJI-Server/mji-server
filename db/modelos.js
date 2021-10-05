const mongoose = require('mongoose');

const crearModelo = (nombre, schema, conexion) => {
  const modelo = conexion.model(nombre, schema);
  return modelo;
}

const obtenerModelo = (nombre, schema, conexion) => {
  let model;
  if(conexion.modelNames().includes(nombre)){
    model = conexion.model(nombre);
  }
  else {
    model = crearModelo(nombre, schema, conexion)
  }
  return model;
}

module.exports = obtenerModelo;