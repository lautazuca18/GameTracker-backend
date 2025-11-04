const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: { type: String },
  genero: { type: String },
  plataforma: { type: String },
  anioLanzamiento: { type: Number },
  desarrollador: { type: String },
  imagenPortada: { type: String },
  descripcion: { type: String },
  completado: { type: Boolean }
});

module.exports = mongoose.model('Juego', juegoSchema);
