'use strict'
var moongose = require ('mongoose');

var Schema = moongose.Schema;

var LogUsuarioSchema = Schema({
    usuario: String,
    descripcion: String,
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('LogUsuario', LogUsuarioSchema);