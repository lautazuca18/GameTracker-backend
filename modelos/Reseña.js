import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  autor: { String },
  texto: { String },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reseña', reseñaSchema);
