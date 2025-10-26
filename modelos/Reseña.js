import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  autor: { String },
  texto: { String },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', reseñaSchema);
