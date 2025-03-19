require('dotenv').config();
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
// establishing connection with the MongoDB database

(async () => {
  try {
    if (typeof dbURI === 'undefined') {
      throw new Error('DB_URI is not defined');
    }
    await mongoose.connect(dbURI);
    // if connected successfully logging connected successfully
    console.log('Connected to database');
  } catch (error) {
    // logging the error
    console.log(error.message);
  }
})();
