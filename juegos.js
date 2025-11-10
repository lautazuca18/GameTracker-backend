const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// ===================================
// 🔹 CONEXIÓN A MONGO
// ===================================
const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/LautaroZuca';

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Base de datos conectada correctamente");
  } catch (error) {
    console.error("❌ Error conectando MongoDB:", error.message);
    process.exit(1);
  }
};

conectarDB();

// ===================================
// 🔹 MODELOS
// ===================================
const Juego = require('./modelos/Juego');
const Reseña = require('./modelos/Reseña');

// ===================================
// 🔹 CRUD JUEGOS
// ===================================
app.get('/juegos', async (req, res) => {
  const juegos = await Juego.find();
  res.send(juegos);
});

app.get('/juegos/:id', async (req, res) => {
  const id = req.params.id;
  const juego = await Juego.findById(id);
  res.send(juego);
});

app.post('/juegos', async (req, res) => {
  const nuevoJuego = new Juego(req.body);
  const guardado = await nuevoJuego.save();
  res.send(guardado);
});

app.put('/juegos/:id', async (req, res) => {
  const id = req.params.id;
  const actualizado = await Juego.findByIdAndUpdate(id, req.body, { new: true });
  res.send(actualizado);
});

app.delete('/juegos/:id', async (req, res) => {
  const id = req.params.id;
  const borrado = await Juego.findByIdAndDelete(id);
  res.send(borrado);
});

// ===================================
// CRUD RESEÑAS
// ===================================
app.get('/resenas', async (req, res) => {
  const resenas = await Reseña.find();
  res.send(resenas);
});

app.get('/resenas/juego/:juegoId', async (req, res) => {
  const { juegoId } = req.params;
  const resenas = await Reseña.find({ juegoId });
  res.send(resenas);
});

app.post('/resenas', async (req, res) => {
  try {
    const nuevaResena = new Reseña(req.body);
    const guardada = await nuevaResena.save();
    res.send(guardada);
  } catch (error) {
    console.error("❌ Error al guardar reseña:", error);
    res.status(500).send("Error al guardar reseña");
  }
});

app.put('/resenas/:id', async (req, res) => {
  const id = req.params.id;
  const actualizada = await Reseña.findByIdAndUpdate(id, req.body, { new: true });
  res.send(actualizada);
});

app.delete('/resenas/:id', async (req, res) => {
  const id = req.params.id;
  const borrada = await Reseña.findByIdAndDelete(id);
  res.send(borrada);
});

// ===================================
// ESTADISTICAS
// ===================================

app.get('/estadisticas', async (req, res) => {
  try {
    const juegos = await Juego.find();
    const reseñas = await Reseña.find();

    const totalJuegos = juegos.length;
    const juegosCompletados = juegos.filter(j => j.completado === true).length;
    const horasJugadas = reseñas.reduce((acc, r) => acc + (r.horasJugadas || 0), 0);
    const promedioPuntuacion = reseñas.length
      ? reseñas.reduce((acc, r) => acc + r.puntuacion, 0) / reseñas.length
      : 0;

    res.json({
      totalJuegos,
      juegosCompletados,
      horasJugadas,
      promedioPuntuacion: promedioPuntuacion.toFixed(1),
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
  }
});

// ===================================
// INICIAR SERVIDOR
// ===================================

app.listen(3000, () => {
  console.log("🚀 Servidor ejecutándose en http://localhost:3000");
});
