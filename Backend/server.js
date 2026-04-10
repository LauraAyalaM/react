import express from "express";
import cors from "cors";

// Crea una instancia de la aplicacion Express
const app = express();

// Define el puerto del servidor
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Habilita CORS para permitir peticiones desde otros dominios
app.use(cors());
// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express. json());

// Ruta de prueba (GET)
app.get("/api/mensaje", (req, res) => {
// Envía una respuesta JSON
    res.json({ texto: "Hola desde el backend " });
});

// JUEGO: ADIVINA EL NÚMERO
// Número secreto inicial
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
// Reiniciar el juego
    app.get("/api/start", (req, res) => {
            numeroSecreto = Math.floor(Math.random() * 100) + 1;
            // Enviamos el número secreto también al frontend para verlo en la consola del navegador
            res.json({
                mensaje: "Nuevo juego iniciado. Adivina un número entre 1 y 100.",
                numeroSecreto // A solo para depuración
        });

    });

// Endpoint para adivinar
app.post("/api/guess", (req, res) => {
    const intento = req.body.numero;

    // Validación básica
    if (!intento && intento !== 0) {
        return res.status(400). json({ mensaje: "Debes enviar un numero." });
    }
    // Comparación con número secreto
    if (intento < numeroSecreto) {
        res. json({ mensaje: "El numero secreto es mayor"});
    } else if (intento > numeroSecreto) {
        res.json({ mensaje: "El numero secreto es menor"});
    } else {
        res. json({ mensaje: "¡Correcto! Adivinaste el numero." });
    }

});

// Inicia el servidor y escucha en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`)
});
