const express = require('express')
const router = new express.Router
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const validator = require ('validator')
const jwt = require('jsonwebtoken')

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
 *                description: signin response
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
    res.status(200).send({token})}catch(e){
        res.status(404).send(e.message)
    }
})
module.exports=router