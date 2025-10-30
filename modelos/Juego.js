const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: { type: String },
  genero: { type: String },
  horasJugadas: { type: Number },
  completado: { type: Boolean },
  puntuacion: { type: Number },
  portada: { type: String }
});

module.exports = mongoose.model('Juego', juegoSchema);

