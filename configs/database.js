const mongoose = require('mongoose')
const env = require('./environments');
const connectString = `${env.MONGO_URI}/${env.DATABASE_NAME}`;

class Database {
   static instance;

   constructor() {
    this.connect();
  }

   connect(type = 'mongodb') {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true });

    mongoose
      .connect(connectString, {
        maxPoolSize: 50
      })
      .then(() => console.log('Connect MongoDB Success!'))
      .catch((err) => console.error(' Error connecting to MongoDB:', err));
  }

   static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

module.exports = Database.getInstance();
