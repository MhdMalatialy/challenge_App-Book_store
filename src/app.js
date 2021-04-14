const express = require('express')
require('dotenv').config({ path: 'src/.env' })
const {Sequelize} = require('sequelize')
const signupRouter = require('./routes/signup')
const signinRouter = require('./routes/signin')
const verifyRouter = require('./routes/verification')
const searchRouter = require('./routes/searchForBook')
const path = require('path');
const cookie_parser=require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cookie_parser(process.env.COOKIE_KEY))
// app.use(passport.initialize());
// app.use(passport.session());
//connect to the database
async function connectDB() {
  const sequeilize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      }
    }})
  try{
      await sequeilize.authenticate()
      console.log('Connected Successfully to Database')
  }
  catch (err) {
      console.error("unable to connect to database please check env variables" , err.message)
  }
}
//set swagger
const swaggerJSDoc = require ('swagger-jsdoc')
const swaggerDefinition = { 
  openapi: '3.0.0',
  info: {
  title: 'Book-store',
  version: '1.0.0',
},
};
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//set the server
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signupRouter)
app.use(signinRouter)
app.use(verifyRouter)
app.use(searchRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const PORT = process.env.PORT
connectDB()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', '../client', 'index.html'));
  });
}
app.listen((PORT),() => {
    console.log("Express server listening on port "+PORT);
  });