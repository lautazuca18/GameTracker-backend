const express = require ('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

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

app.listen(3000, () => {
    console.log("Servidor ejecutandose en http://localhost:3000");
})