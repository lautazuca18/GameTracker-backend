const express = require ('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/LautaroZuca';

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Base de datos conectada correctamente");
    } catch (error) {
        console.error("Error conectando mongoDB: ", error.message);
        process.exit(1);
    }
}

conectarDB();

const Juego = require('./modelos/Juego');

app.get('/juegos', async (req, res) => {
    const juegos = await Juego.find();
    res.send(juegos);
});

app.post('/juegos', async (req, res) => {
    const titulo = req.body.titulo;
    const genero = req.body.genero;
    const plataforma = req.body.plataforma;
    const anioLanzamiento = req.body.anioLanzamiento;
    const desarrollador = req.body.desarrollador;
    const imagenPortada = req.body.imagenPortada;
    const descripcion = req.body.descripcion;
    const completado = req.body.completado;

    const juego = {
        titulo,
        genero,
        plataforma,
        anioLanzamiento,
        desarrollador,
        imagenPortada,
        descripcion,
        completado
    }

    const nuevoJuego = new Juego(juego);

    const juegoGuardado = await nuevoJuego.save();

    res.send(juegoGuardado);
});

app.put('/juegos/:id', async (req, res) => {
    const id = req.params.id;
    const titulo = req.body.titulo;
    const genero = req.body.genero;
    const plataforma = req.body.plataforma;
    const anioLanzamiento = req.body.anioLanzamiento;
    const desarrollador = req.body.desarrollador;
    const imagenPortada = req.body.imagenPortada;
    const descripcion = req.body.descripcion;
    const completado = req.body.completado;

    const juego = {
        titulo,
        genero,
        plataforma,
        anioLanzamiento,
        desarrollador,
        imagenPortada,
        descripcion,
        completado
    }

    const juegoActualizado = await Juego.findByIdAndUpdate(id, juego, { new: true });

    res.send(juegoActualizado);
});

app.delete('/juegos/:id', async (req, res) => {
    const id = req.params.id;

    const juegoBorrado = await Juego.findByIdAndDelete(id);

    res.send(juegoBorrado);
});

app.listen(3000, () => {
    console.log("Servidor ejecutandose en http://localhost:3000");
})