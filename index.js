require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

const DB_URI = process.env.DB_URI;
// || "mongodb://127.0.0.1:27017/instituto"
const PORT = process.env.PORT;
//  || 3000

mongoose.set('strictQuery', true);
mongoose.connect(DB_URI)
    .then(db => console.log("Conectado a servidor BD"))
    .catch(error => console.log("Hubo un error", error))

app.use(express.static('public'));
app.use(express.json());

//Schema Alumno

const Alumno = mongoose.model('Alumno', new mongoose.Schema(
    {
        nombre: { type: String, default: "Sin nombre" },
        curso: { type: String, default: "No especificado" }
    }
));


app.get("/api/alumnos", cors(), (req, res) => {
    Alumno.find(
        {},
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})


app.post("/api/alumnos", cors(), (req, res) => {
    new Alumno({ nombre: req.body.nombre, curso: req.body.curso })
        .save(
            (error, data) => {
                if (error) res.json(error);
                else res.json(data)
            });
})



app.delete("/api/alumnos/:id", cors(), (req, res) => {
    Alumno.findOneAndRemove(
        { _id: req.params.id },
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})



app.put("/api/alumnos/:id", cors(), (req, res) => {
    Alumno.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { nombre: req.body.nombre, curso: req.body.curso } },
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})


//Schema Profesor

const Profesor = mongoose.model('Profesor', new mongoose.Schema(
    {
        nombre: { type: String, default: "Sin nombre" },
        asignatura: { type: String, default: "No especificado" }
    }
));


app.get("/api/profesores", cors(), (req, res) => {
    Profesor.find(
        {},
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})


app.post("/api/profesores", cors(), (req, res) => {
    new Profesor({ nombre: req.body.nombre, asignatura: req.body.asignatura })
        .save(
            (error, data) => {
                if (error) res.json(error);
                else res.json(data)
            });
})



app.delete("/api/profesores/:id", cors(), (req, res) => {
    Profesor.findOneAndRemove(
        { _id: req.params.id },
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})



app.put("/api/profesores/:id", cors(), (req, res) => {
    Profesor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { nombre: req.body.nombre, asignatura: req.body.asignatura } },
        (error, data) => {
            if (error) res.json(error);
            else res.json(data)
        }
    )
})

app.listen(PORT, () => { console.log("Iniciado servidor web") });