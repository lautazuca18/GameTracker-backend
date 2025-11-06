const mongoose = require('mongoose');

const reseñaSchema = new mongoose.Schema({
  juegoId: {type: String},
  puntuacion: {type: Number},
  textoReseña: {type: String},
  horasJugadas: {type: Number},
  dificultad: {type: String},
  recomendaria: {type: Boolean},
  fechaCreacion: {type: Date},
  fechaActualizacion: {type: Date}
});

module.exports = mongoose.model('Reseña', reseñaSchema);
