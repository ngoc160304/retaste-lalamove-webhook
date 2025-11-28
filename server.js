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


app.post(`${api}/order/confirm`, async (req, res) => {
  console.log('req.body', req.body);
  const status = req.body?.order?.status || null;
  console.log(status)
  if(Object.keys(req.body).length > 0) {
    const { data: {
      order: {
        orderId,
      }
    } } = req.body || {};
    const status = req.body?.order?.status || null;
    if (status && status === 'COMPLETED') {
      const delivery = mongoose.connection.db.collection('deliveries');
      const getDelivery = await delivery.findOne({
        orderDeliveryId: orderId
      })
      const order = mongoose.connection.db.collection('orders');
      const update = await order.updateOne({
        _id: getDelivery.orderId
      }, {
        $set: { orderStatus: 'success' }
      })
      console.log(getDelivery);
      console.log(update);
    }
    if (status && status === 'PICKED_UP') {
      const delivery = mongoose.connection.db.collection('deliveries');
      const getDelivery = await delivery.findOne({
        orderDeliveryId: orderId
      })
      const order = mongoose.connection.db.collection('orders');
      const update = await order.updateOne({
        _id: getDelivery.orderId
      }, {
        $set: { orderStatus: 'out_for_delivery' }
      })
      console.log(getDelivery);
      console.log(update);
    }
    res.json({
      mess: 'Server is running'
    })
  }
  res.json({
    mess: 'Server is running'
  })
})

app.post(`${api}/order/payment`, async (req, res) => {
  console.log('Webhook payment connect success !');
  if(req.body) {
    console.log(req.body)
  }
  res.json({
    mess: 'Webhook payment connect success !'
  })
})

app.listen(port, () => {
  console.log(`App is running on http://${env.APP_HOST}:${env.APP_PORT} !`);
});
