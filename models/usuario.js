//Cargar nuevas funcionalidades de JS
'use strict'

//Cargar Mongoose para MongoDB
var mongoose = require('mongoose');
//Acceso a las Esquemas
var Schema = mongoose.Schema;

//Esquema o Tabla para Usuario
//Nota: Es importante que nuestro modelo sea un nombre singular y mayuscula, ya que Mongoose 
//creará la colección en la base de datos pluralizando el nombre, de esta forma se hace el enlace
//de nuestro modelo con la respectiva colección en la base de datos.
//NOTA: No hacer este paso nos puede generaar inconvenientes.
var UsuarioSchema = Schema({
    usuario: String,
    nombre: String,
    clave: String,
    date: {type: Date, default: Date.now},
    image: String
});

//Para exportar el modelo y que podamos importarlo desde otros ficheros
//debemos pasar los parametros: Nombre del modelo y esquema del modelo 
//Nota: Mongoose nos creará este modelo en la base de datos que especificamos en la conexión a BD
module.exports = mongoose.model('Usuario', UsuarioSchema);