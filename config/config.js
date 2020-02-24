//Nota: process es un objeto global que siempre esta corriendo en Node
//======================================================
//CONFIGURACION DE VARIABLES DEL TOKEN
//======================================================
process.env.PORT = process.env.PORT || 3721; //Si no existe en Heroku use el puerto 3721
process.env.CADUCIDAD_TOKEN = 60*60*24*30;
process.env.SEED_TOKEN = 'carlosvilla';




//NUEVO ARCHIVO GLOBAL PARA CONFIGURACIONES, AQUI OBLIGAMOS A QUE SE CARGUEN LAS 
//VARIABLES DEL ARCHIVO CONFIG, Agregar el siguiente código después de :var bodyParser = require('body-parser');