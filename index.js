const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors(
    {
      origin: [
        "http://localhost:5173"
        // "https://prakritik-shongi.web.app",
        // "https://prakritik-shongi.firebaseapp.com",
      ],
    }
  ));
  app.use(express.json());


  app.get('/', (req, res) => {
    res.send('Kajer-Khoj-server is running...')
  })
  
  app.listen(port, () => {
    console.log(`Kajer-Khoj-server is running on port : ${port}`)
  })