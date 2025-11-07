// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Página inicial (opcional, FCC no la testea)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// === Timestamp API ===
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Si no hay parámetro → fecha actual
  if (!dateParam) {
    date = new Date();
  } 
  // Si el parámetro es solo números → timestamp en milisegundos
  else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } 
  // Sino → intentar parsear string
  else {
    date = new Date(dateParam);
  }

  // Validar si la fecha es válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Devolver JSON con unix y utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Iniciar servidor
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
