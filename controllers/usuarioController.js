//#region CONFIGURACION DEL CONTROLADOR
'use strict'

//Importar modulo para validaciones
var validator = require('validator');

//Importar control para el File System y poder borrar archivos que no cumplan con la extension correspondiente
var fs = require('fs');
//Importar librerias para obtener el path de un archivo
var path = require ('path');

//Importar el modelo
var Usuario = require('../models/usuario');
//#endregion

//#region CREAR CONTRADOR E INCORPORAR LAS ACCIONES CORRESPONDIENTES
var controller = {

    save:(req,res) =>{
        //Obtener parametros por post que vienen en el body
        var params = req.body;

        //Validar datos
        try{
            //Documentación para validators: https://www.npmjs.com/package/validator
            //Retornar true cuando no esten vacias las siguientes variables
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_clave = !validator.isEmpty(params.clave);
        }
        catch(err){
            return res.status(200).send({
                status:'error',
                message:'Existen Campos Vacíos.'
            });
        }

        if(validate_nombre && validate_usuario && validate_clave)
        {
            //Instanciar Modelo
            var usuario = new Usuario();

            //Mapeo de información en campos
            usuario.nombre = params.nombre;
            usuario.usuario = params.usuario;
            usuario.clave = params.clave;

            if(params.image)
            {
                usuario.image = params.image;
            }
            else
            {
                usuario.image = null;
            }
            

            //Guardar En MongoDB
            usuario.save( (err,usuarioStored)=>{
                if(err || !usuarioStored)
                {
                    return res.status(404).send({
                        status: 'error',
                        message:'Error al guardar el registro.'
                    })
                }

                //Retornar resultados
                return res.status(200).send({
                    status:'success',
                    usuario
                });
            } );
            
        }
        else
        {
            return res.status(200).send({
                status:'error',
                message:'Los Datos No Son Correctos.'
            });
        }
    },
    
    //#region ACCIONES O METODOS DE PRUEBAS
    usuarioTest0:(req,res)=>{

        //PROBAR MEDIANTE POSTMAN ENVIAR EL PARAMETRO sVar EN EL BODY EN x-wwww-form-urlencoded
        var sVar = req.body.sVar;
    
        return res.status(200).send({
            campo1:'Valor1',
            campo2:'Valor2',
            campoNum1: 1,
            sVar
        });
    },

    usuarioTest1:(req,res) =>{
        return res.status(200).send({
            message: 'Acción Test, Controlador: usuario.JS'
        });
    },
    //#endregion

    //#region OBTENER TODO EL LISTADO DE USUARIOS
    getUsuarios: (req,res)=>{
        //Buscar    find({}) vacío para no incorporar un where y que retorne toda la data
        //.sort('_id') ORDENAR DE FORMA ASCENDENTE
        //.sort('-_id') ORDENAR DE FORMA DESCENDENTE
        Usuario.find({}).sort('-_id').exec( (err,usuarioVista)=>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al retornar los usuarios.'
                });
            }

            if(!usuarioVista){
                return res.status(404).send({
                    status:'error',
                    message: 'Actualmente no existen datos registrados.'
                });
            }

            return res.status(200).send({
                status:'success',
                usuarioVista
            });
        } );

        
    },
    //#endregion

    //#region OBTENER TOP N DE USUARIOS
    getTopNUsuario: (req,res)=>{

        var query = Usuario.find({});
        var last = req.params.last;
        
        //Si last es true o diferente a undefined
        if(last || last!=undefined)
        {
            //Convertir texto a entero, el parametro 10 es debido a la base decimal
            query.limit( parseInt(last,10) );
        }

        //Buscar    find({}) vacío para no incorporar un where y que retorne toda la data
        //.sort('_id') ORDENAR DE FORMA ASCENDENTE
        //.sort('-_id') ORDENAR DE FORMA DESCENDENTE
        query.sort('-_id').exec( (err,usuarioVista)=>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al retornar los usuarios.'
                });
            }

            if(!usuarioVista){
                return res.status(404).send({
                    status:'error',
                    message: 'Actualmente no existen datos registrados.'
                });
            }

            return res.status(200).send({
                status:'success',
                usuarioVista
            });
        } );

    },
    //#endregion

    //#region OBTENER UN USUARIO SEGUN EL ID 
    getUsuario: (req,res)=>{

        var usuarioId = req.params.id;
        
        //Si last es true o diferente a undefined
        if(!usuarioId || usuarioId==null)
        {
            if(!articles){
                return res.status(404).send({
                    status:'error',
                    message: 'El registro no existe.'
                });
            }
        }

        //Buscar Por Id
        Usuario.findById(usuarioId, (err,usuarioVista)=>{

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'El registro no existe.'
                });
            }

            if(!usuarioVista){
                return res.status(404).send({
                    status:'error',
                    message: 'El registro no existe.'
                });
            }

            return res.status(200).send({
                status:'success',
                usuarioVista
            });
        } );

    },
    //#endregion

    //#region CRUD PARA COLECCION DE USUARIOS

    //#region SALVAR USUARIOS
    save:(req,res) =>{
        //Obtener parametros por post que vienen en el body
        var params = req.body;

        //Validar datos
        try{
            //Documentación para validators: https://www.npmjs.com/package/validator
            //Retornar true cuando no esten vacias las siguientes variables
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_clave = !validator.isEmpty(params.clave);
        }
        catch(err){
            return res.status(200).send({
                status:'error',
                message:'Existen Campos Vacíos.'
            });
        }

        if(validate_nombre && validate_usuario && validate_clave)
        {
            //Instanciar Modelo
            var usuario = new Usuario();

            //Mapeo de información en campos
            usuario.nombre = params.nombre;
            usuario.usuario = params.usuario;
            usuario.clave = params.clave;

            if(params.image)
            {
                usuario.image = params.image;
            }
            else
            {
                usuario.image = null;
            }
            

            //Guardar En MongoDB
            usuario.save( (err,usuarioStored)=>{
                if(err || !usuarioStored)
                {
                    return res.status(404).send({
                        status: 'error',
                        message:'Error al guardar el registro.'
                    })
                }

                //Retornar resultados
                return res.status(200).send({
                    status:'success',
                    usuario
                });
            } );
            
        }
        else
        {
            return res.status(200).send({
                status:'error',
                message:'Los Datos No Son Correctos.'
            });
        }
    },
    //#endregion

    //#region ACTUALIZAR DOCUMENTO O AREGISTRO EN LA COLECCION DE USUARIOS
    update: (req,res)=>{
        //CARGAR EL ID DESDE PARAMETROS
        var ausuarioId = req.params.id;
    
        //CARGAR TODOS LOS CAMPOS QUE SE RECIBEN POR EL BODY
        var params = req.body;

        //VALIDACION DE DATOS
        try{
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_usuario = !validator.isEmpty(params.usuario);
            var validate_clave = !validator.isEmpty(params.clave);
        }catch(err){
            return res.status(404).send({
                status:'error',
                message: 'Existen campos vacíos.'
            });
        }

        if(validate_nombre && validate_usuario && validate_clave)
        {
            Usuario.findOneAndUpdate( {_id:ausuarioId}, params, {new:true}, (err, usuarioUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status:'error',
                        message: 'Error al actualizar los datos.'
                    });
                }

                if(!usuarioUpdated){
                    return res.status(404).send({
                        status:'error',
                        message: 'Error no existe el registro.'
                    });
                }

                return res.status(200).send({
                    status:'success',
                    message: 'Registro actualizado correctamente.'
                });

            });
        }else
        {
            return res.status(500).send({
                status:'error',
                message: 'Los datos no son correctos.'
            });
        }

    },
    //#endregion
    
    //#region ELIMINAR UN DOCUMENTO O REGISTRO EN COLECCION DE USUARIOS
    delete: (req,res)=>{
        //CARGAR EL ID DESDE PARAMETROS
        var usuarioId = req.params.id;

        //Borrar el registro mediante el Id
        Usuario.findOneAndDelete( {_id:usuarioId}, (err, usuarioRemoved)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'Error al intentar eliminar el registro.'
                });
            }

            if(!usuarioRemoved){
                return res.status(404).send({
                    status:'error',
                    message: 'Error no existe el registro.'
                });
            }

            return res.status(200).send({
                status:'success',
                message: 'Registro eliminado correctamente.'
            });

        });

    },
    //#endregion

    //#region SUBIR UN ARCHIVO Y ACTUALIZAR EL CAMPO IMAGEN EN EL DOCUMENTO USUARIO EN LA COLECCION DE USUARIOS
    /*Subir una imagen al servidor*/
    upload: (req,res) =>{

        var file_name = 'La Imagen no pudo guardarse en el destino';

        //Obtener el archivo desde la petición
        if(!req.files)
        {
            return res.status(404).send({
                satus:'error',
                message: file_name
            });
        }

        //Obtener nombre y extensión de archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Nombre
        var file_name = file_split[2];
        //Extensión
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        
        //NOTA: PARA PUBLICAR EN LINUX O MAC EN UN AMBIENTE DE PRODUCCION RECORDAR 
        //QUE EN LUGAR DE \\ EN EL SPLIT SOLO ES UNA /

        //Validar que el archivo es una imagen
        if(file_ext !='png' && file_ext !='jpg'&& file_ext !='gif' && file_ext !='jpeg')
        {
            //Borrar el contenido del archivo
            fs.unlink(file_path, (err)=>{ 
                return res.status(404).send({
                    status:'error',
                    message: 'Solo se permite registrar imagenes en los formatos jpg, jpeg, png, gif.'
                });
            } );
        }
        else
        {
            //Si es valido debe asignar la imagen al usuario correspondiente
            
            //Obtener Id desde la url
            var usuarioId = req.params.id;

            //Si el parametro usuarioId contiene datos
            if(usuarioId)
            {
                //Buscar el usuario correspondiente al _Id
                Usuario.findOneAndUpdate( {_id:usuarioId},{image:file_name},{new:true}, (err,usuarioUpdated)=>{
                    //Notificar al browser
                    if(err || usuarioUpdated)
                    {
                        return res.status(404).send({
                            status:'error',
                            fichero: req.files,
                            message: 'Error al intentar guardar el archivo en el servidor.'
                        });
                    }
                    
                    return res.status(200).send({
                        status:'success',
                        fichero: usuarioUpdated,
                        split: file_split,
                        message: 'El Archivo Se Guardo Correctamente En El Servidor.'
                    });

                });
            }
            else
            {
                return res.status(200).send({
                    status:'success',
                    image:file_name,
                    split: file_split,
                    message: 'El Archivo Se subió Correctamente En El Servidor.'
                });
            }
            
        }
    },
    //#endregion

    //#endregion

    //#region OBTENER UNA IMAGEN SEGUN EL NOMBRE DE LA MISMA
    getImage: (req, res)=>{

        var file = req.params.image;
        var path_file = './upload/usuarios/'+file;

        fs.exists(path_file, (exists)=>{
            //Validar que retorna exists
            //console.log(exists);
            if(exists)
            {
                return res.sendFile(path.resolve(path_file));
            }
            else
            {
                return res.status(404).send({
                    status:'Error',
                    message: 'Imagen no encontrada.'
                });
            }
        });
    },
    //#endregion

    //#region METODO PARA BUSCAR UN USUARIO
    search : (req,res) =>{
        var searchString = req.params.descrip;

        //Realizar una busqueda con OR utilizando Mongoose para retornar aquellos 
        //documentos que cuyo nombre y usuario coincidan con la expresion de busqueda
        Usuario.find( 
            { 
                "$or": [
                            {"nombre" : {"$regex": searchString, "$options":"i"}},
                            {"usuario" : {"$regex": searchString, "$options":"i"}}
                        ] 
            } 
        )
        .sort([ ['date','descending'] ]) //Aplicar ordenamiento a la lista resultante
        .exec( (err,usuarioVista) =>
        {
            if(err)
            {
                return res.status(500).send({
                    status:'error',
                    message: 'Error en la petición'
                });
            }
            if(!usuarioVista || usuarioVista.length <=0 )
            {
                return res.status(404).send({
                    status:'error',
                    message: 'No Existen Registros Con Esa Descripción.'
                });
            }
            return res.status(200).send({
                status:'success',
                usuarioVista
            });
        } );

        
    }
    //#endregion

}; //END CONTROLLER
//#endregion

//#region EXPORTAR CONTROLADOR PARA SU USO POSTERIOR
module.exports = controller;
//#endregion