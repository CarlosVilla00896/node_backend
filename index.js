'use strict'
var mongoose = require('mongoose');
//Cargar modulo del servidor
var app = require('./app');
//Configurar el puerto que utilizará la aplicación
var nPort = 3721;
//Nombre de la Base de datos
var sBaseDeDatos = 'ProyectoDeClase';

//Desactiva la forma antigua de MongoDB
mongoose.set('useFindAndModify',false);
//Habilidar la promesa para evitar problemas al conectarnos
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/'+sBaseDeDatos, {useNewUrlParser:true, useUnifiedTopology: true} ).then( ()=> {
//mongoose.connect('mongodb+srv://sa:Hola1234@cluster0-fn7db.azure.mongodb.net/api_rest_blog', {useNewUrlParser:true, useUnifiedTopology: true} ).then( ()=> {
    console.log(`La Conexión a Base de Datos: ${sBaseDeDatos} es Correcta!!`);
    
    //CREAR SERVIDOR Y ESCUCHAR PETICIONES EN HTTP
    app.listen(nPort, ()=>{
        console.log('El Servidor esta corriendo correctamente en: http://localhost:'+nPort);
    } )

} );