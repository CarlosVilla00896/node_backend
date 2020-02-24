'use strict'

//Cargar módulos de Node para crear el servidor
var express = require('express');
//Cargar bodyparser para convertir a JSON lo que recibimos 
var bodyParser = require('body-parser');

require('./config/config');

//Ejecutar Express para poder trabajar con Http
var app = express();

//Cargar nuestro archivo de rutas que usará Express
var usuario_routes = require('./routes/usuarioRoute'); //NUEVO

var login_routes = require('./routes/login');

//Cargar bodyparser en Express 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Habilitar CORS
app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
});
    
//Agregar prefijo de rutas ‘api’
app.use('/api',usuario_routes); //NUEVO
app.use('/api',login_routes);

//CARGAR FRONTEND MEDIANTE UNA RUTA ESTATICA Esto es cuando vamos a producción y desea tener todo junto

//Configurar documento express con una salida por defecto.
app.get('/',function(req,res){ res.send('Express OnLine!');});

//Configurar una ruta adicional para pruebas
app.get('/Test',(req,res)=>{
    return res.status(200).send({
        Clase:'Aplicaciones de vanguardia',
        Tecnologias: 'MEAN Stack'
    })
})
app.post('/Test2',(req,res)=>{
        var sParam = req.body.sMiParametro;
        return res.status(200).send({
            Clase:'Aplicaciones de vanguardia',
            Tecnologias: 'MEAN Stack',
            TuParametro: sParam
        });
    });

// el link de postman http://localhost:3721/Test2
//Exportar el modulo (fichero actual) para poder usarlo fuera y cargar el app.js en el index
module.exports = app;
