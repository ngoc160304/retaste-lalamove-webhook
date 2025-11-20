const express = require('express');
const env = require('./configs/environments');
require('./configs/database');
require('dotenv').config()
const CryptoJS = require('crypto-js');
const cors = require('cors');

const port = process.env.PORT || 9000 

const corsOptions = require('./configs/cors');
const { default: axios } = require('axios');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const api = '/api/v1';

const API_KEY = env.LALAMOVE_API_KEY;
const API_SECRET = env.LALAMOVE_API_SECRET;

console.log(API_KEY);
console.log(API_SECRET)
const body = JSON.stringify({
  data: {
    url: "https://retaste-lalamove-webhook.onrender.com/api/v1/order/confirm"
  }
});
const time = new Date().getTime().toString();
const region = "VN";
const method = "PATCH";
const path = "/v3/webhook";

const rawSignature = `${time}\r\n${method}\r\n${path}\r\n\r\n${body}`;
const SIGNATURE = CryptoJS.HmacSHA256(rawSignature, API_SECRET).toString();



app.get('/', (req, res) => {
  res.json({
    ok: 'ok'
  })
})


app.post(`${api}/order/confirm`, (req, res) => {
  console.log('req.body', req.body);
  const collection = mongoose.connection.db.collection('users');
  collection.updateOne({
    _id: new mongoose.Types.ObjectId('6903137f746d11d1f753a4d5')
  },{
    $set: {
      isDeleted: true
    }
  })
  res.json({
    mess: 'Server is running'
  })
})

app.listen(port, () => {
  console.log(`App is running on http://${env.APP_HOST}:${env.APP_PORT} !`);
});
