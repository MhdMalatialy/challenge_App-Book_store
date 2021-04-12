const express = require('express')
const router = new express.Router
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const validator = require ('validator')
const sendVerifyEmail = require('../services/sendVerifyEmail')
/**
 * @swagger
 * /user/signup:
 *    post:
 *      summary: create a new user
 *      tags: [User]
 *      description: create a new user
 *      parameters:
 *        - in: body
 *          schema:
 *            type: object
 *            required: [email, password,first_name,last_name,re-password]
 *            description: user's model
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              re-password:
 *                type: string
 *              first_name:
 *                type: string
 *              last_name:
 *                type: string
 * 
 *      responses:
 *        200:
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                description: signup response
 *                properties:
 *                  token:
 *                    type: string
 *        400:
 *          description: incomplete info  
 *        401:
 *          description: passwords should match 
 *        402:
 *          description: invalid email
 *        404:
 *          description: something went wrong        
 */

router.post('/user/signup', async (req,res) => {
    try{
        const input = req.body
        if(!input.email || !input.password || !input.last_name 
            || !input.first_name || !req.body.re_password){
            return res.status(400).send('incomplete info')
        }
        if(!input.password === input.re_password){
            return res.status(401)
            .send('passwords should match')
        }     
            if(!validator.isEmail(req.body.email)){
               return res.status(402)
               .send('email should be like: example@example.com')
            }              
       
        const hashedPassword = await bcrypt.hash(req.body.password,8)

        const preActiveUSer = await prisma.user.create({
            data:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                password:hashedPassword,
                email:req.body.email
            }
        })
        sendVerifyEmail(preActiveUSer)
        
        res.status(200).cookie('login', {preActiveUSer}).redirect('/')}catch(e){
            res.status(404).send(e)
        }
})

module.exports=router