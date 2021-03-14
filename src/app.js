const express = require('express')
require('dotenv').config({ path: 'src/.env' })
const {Sequelize} = require('sequelize')
const signupRouter = require('./routes/signup')
const app = express()
const bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signupRouter)
const PORT = process.env.PORT
async function connectDB() {
  const sequeilize = new Sequelize(process.env.DATABASE_URL)
  try{
      await sequeilize.authenticate()
      console.log('Connected Successfully to Database')
  }
  catch (err) {
      console.error("unable to connect to database please check env variables" , err.message)
  }
}
connectDB()
app.listen((PORT),() => {
    console.log("Express server listening on port "+PORT);
  });
app.use(signupRouter)