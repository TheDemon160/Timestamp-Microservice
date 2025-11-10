const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Timestamp Microservice</h1>
    <p>Uso: GET /api/timestamp/:date_string?</p>
    <p>Ejemplos: <code>/api/timestamp</code>, <code>/api/timestamp/2015-12-25</code>, <code>/api/timestamp/1451001600000</code></p>
  `);
});

app.get('/api/timestamp/:date?', (req, res) => {
  const { date: dateParam } = req.params;
  let dateObj;

  if (!dateParam) {
    dateObj = new Date();
  } else {
    if (/^\d+$/.test(dateParam)) {
      if (dateParam.length === 13) {
        dateObj = new Date(Number(dateParam));
      } else if (dateParam.length === 10) {
        dateObj = new Date(Number(dateParam) * 1000);
      } else {
        dateObj = new Date(Number(dateParam));
      }
    } else {
      dateObj = new Date(dateParam);
    }
  }

  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
