const express = require('express')
const router = new express.Router
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const validator = require ('validator')
const jwt = require('jsonwebtoken')
const passportGoogle = require('../services/googleAuth')
/**
 * @swagger
 * /user/login:
 *    post:
 *      summary: login a user
 *      tags: [User]
 *      description: login a user 
 *      parameters:
 *        - in: body
 *          schema:
 *            type: object
 *            required: [email, password]
 *            description: user's Credentials
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      responses:
 *        200:
 *          description: Ok
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                description: login response
 *                properties:
 *                  token:
 *                    type: string
 *        400:
 *          description: incomplete info  
 *        401:
 *          description: undefined user
 *        402:
 *          description: invalid email
 *        403:
 *          description: incorrect password
 *        404:
 *          description: something went wrong        
 */
router.post('/user/login',async (req,res) => {
    const input = req.body
    if(!input.email || !input.password){
       return res.status(400).send('incomplete info')
    }
    if(!validator.isEmail(input.email)){
        return res.status(402).send('invalid email')
    }
    try{
        const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        },
      })
      if(!user) {
        return res.status(401).send('undefined user')
    }
    const isMatch = await bcrypt.compare(input.password,user.password)
    if(!isMatch) {
        return res.status(403).send('incorrect password')
    }
    const token = jwt.sign({ id: user.id.toString() }
    , process.env.JWTKEY);
    return res.status(200).cookie('login', {user,token}).redirect('/')
}catch(e){
        return res.status(404).send(e.message)
    }
})

/**
 * @swagger
 * /auth/google:
 *    get:
 *      summary: The button which redirects the user to the google login page
 *      tags: [User]
 *      description: login via google
 */
 router.get('/auth/google', passportGoogle.authenticate('google',
 {scope: ['profile', 'email'], session: false }))

/**
 * @swagger
 * /auth/google/redirect:
 *    get:
 *      summary: this end point will called by default when the user logged in using google
 *      tags: [User]
 *      description: login using google and returns token
 *      parameters:
 *        - in: header
 *          schema:
 *            type: object
 *            required: [token]
 *            description: user's token
 *            properties:
 *              token:
 *                type: string
 *      responses:
 *        201:
 *          description: login successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                description: sign in response
 *                properties:
 *                  token:
 *                    type: string
 *        401:
 *          description: login failed
 */
router.get('/auth/google/redirect',
passportGoogle.authenticate('google', 
{ session: false, failureRedirect: `${process.env.URL}` })
, (req, res) => {

    const token = req.user.token
    const user =  req.user.user
    if (!token){
        return res.status(404).send()
    }
     return res.status(201).cookie('login', {user,token}).redirect('/')
});
router.get('/current_user', (req, res) => {
    return res.status(201).send(req.cookies.login ? req.cookies.login:"login please");
    
  })

  
router.get('/user/logout', (req,res) => {
    res.clearCookie('login')
    res.redirect('/')
})
module.exports=router