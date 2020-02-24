const express = require('express');

//Utilidad para encriptados
//Documentación en linea: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //NUEVO, esto lo agregamos cuando a tenemos listo el código para retornar el token

var Usuario = require('../models/usuario');
const app = express();

//Configurar una ruta
app.post('/login', (req,res)=>{
    let body = req.body;
    //Aseguramos que no enviamos la clave, ya que esto podria ser manipulado del lado del cliente.
    //https://jwt.io/
    Usuario.findOne({usuario:body.usuario},{nombre:1,usuario:1,date:1},(err,usuarioResp)=>{
        //Validar cualquier error durante la consulta con la BD
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        //Validar si el usuario no existe en la BD
        if(!usuarioResp){
            return res.status(400).json({
                ok:false,
                err:{message:'Problemas de autenticación'}
            });
        }

        //Validar si la contraseña recibida y encriptada  hace match con la registrada en la BD
        /*
        if(!bcrypt.compareSync( body.clave, usuarioResp.clave)){
            return res.status(400).json({
                ok: true,
                err: { message:'Problemas al momento de autenticar'} //No debemo brindar descripciones sobre problemas de autenticacion, por temas de seguridad
            });
        }
        */

        //Configurar Tokens Validos por 1 hora: { expiresIn: 60*60} //60 S * 60 M
        //Configurar Tokens Validos por 3 día: { expiresIn: 60*60*24}
        //Configurar Tokens Validos por 30 días: { expiresIn: 60*60*24*30}
        let MiToken =  jwt.sign(
                                    { usuario:usuarioResp },
                                    process.env.SEED_TOKEN,
                                    { expiresIn: process.env.CADUCIDAD_TOKEN} 
                               );

        //Definir respuesta al liente
        res.json({
            ok: true,
            usuario: usuarioResp,
            token: MiToken
        });
    });

   
});

module.exports = app;
