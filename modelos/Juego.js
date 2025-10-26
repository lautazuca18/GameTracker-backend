const mongoose = require('mongoose');

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { String },
  horasJugadas: { Number },
  completado: { Boolean },
  puntuacion: { Number },
  portada: { String }
});

module.exports = mongoose.model('Juego', juegoSchema);

