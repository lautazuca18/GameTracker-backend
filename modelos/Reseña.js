import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  autor: { String },
  texto: { String },
  fecha: { type: Date }
});

module.exports = mongoose.model('Reseña', reseñaSchema);
