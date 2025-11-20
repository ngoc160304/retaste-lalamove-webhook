const express = require('express');
const env = require('./configs/environments');
require('./configs/database');
require('dotenv').config()

const cors = require('cors');

const port = process.env.PORT || 9000 

const corsOptions = require('./configs/cors');
const app = express();

const API_KEY = env.LALAMOVE_API_KEY;
const API_SECRET = env.LALAMOVE_API_SECRET;

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = '/api/v1';

app.get('/', (req, res) => {
  res.json({
    ok: 'ok'
  })
})


app.post(`${api}/order/confirm`, (req, res) => {
  res.json({
    mess: 'Server is running'
  })
})

app.listen(port, () => {
  console.log(`App is running on http://${env.APP_HOST}:${env.APP_PORT} !`);
});
