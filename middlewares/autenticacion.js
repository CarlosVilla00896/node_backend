const jwt = require('jsonwebtoken');
let verificarMiToken = (req,res, next) =>{
    let sToken = req.get('token');
    console.log(sToken);    

    jwt.verify(sToken, process.env.SEED_TOKEN, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }
        //Ya que en el token enviamos el objeto usuario lo obtenemos mediante decoded
        req.usuarioToken = decoded.usuario;

        //NOTA: SI NO EJECUTA NEXT NO SE EJECUTARA EL METODO SIGUIENTE 
        //QUE EN ESTE CASO SON LAS FUNCIONES DE NUESTRO CONTROLLER
        next();
    });
};
module.exports = {verificarMiToken}
