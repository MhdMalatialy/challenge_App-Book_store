const express = require('express')
require('dotenv').config({ path: './config/.env' })

const app = express()
const PORT = process.env.PORT
app.listen((PORT),() => {
    console.log("Express server listening on port "+PORT);
  });
