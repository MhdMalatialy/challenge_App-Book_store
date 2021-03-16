const express = require('express');
const router = new express.Router;
require('dotenv').config({ path: './src/.env' });
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const validator = require ('validator')
const sendVerifyEmail = require('../services/sendVerifyEmail')
const jwt = require('jsonwebtoken')
/**
 * @swagger
 * /verification/:userId/:secretCode:
 *    get:
 *      summary: verify email handler
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: to find the user by its id
 *          schema:
 *            type: string
 *        - in: path
 *          name: secretCode
 *          description: to check if the URL
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: activated
 *        400:
 *          description: Already activates
 *        401:
 *          description: user not Found
 *        402:
 *          description: invalid link
 *        404:
 *          description: something went wrong          
 */
 
router.get('/verification/:userId/:secretCode', async (req, res) => {
    const { userId, secretCode } = req.params;
        const id = parseInt(userId,10)
    try {
        const user =  await prisma.user.findUnique({
            where: {
                id
            },
        })
        if (!user) {
            return res.status(401).send('user not found')
        }
        if (user.activated){
            return res.status(400).send('already activated')
        }
        const theSecretCode = await prisma.secretCode.findFirst({
            where: {
                code: secretCode 
            }
        });
        if (!theSecretCode){
            return res.status(402).send('the link is invalid')
        }
        await prisma.secretCode.delete({
            where :{
                email: user.email
            }
        });
        const updateUser = await prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                activated: true,
            },
        })
        const token = jwt.sign({ id: updateUser.id.toString() }
        , process.env.JWTKEY);
        res.status(200).send({token});
    } catch (e) {
        res.status(404).send(e.message);
    }
});
/**
 * @swagger
 * /verify/resend:
 *    post:
 *      summary: resend verify email
 *      tags: [User]
 *      description: verify email
 *      parameters:
 *        - in: body
 *          schema:
 *            type: object
 *            required: [email]
 *            description: user's email
 *            properties:
 *              email:
 *                type: string
 *      responses:
 *        200:
 *          description: sent
 *        400:
 *          description: Already activates
 *        401:
 *          description: user not Found
 *        402:
 *          description: invalid email
 *        404:
 *          description: something went wrong          
 */
router.post('/verify/resend', async (req,res) =>{
    try{
    const email = req.body.email
    if(!email || !validator.isEmail(email)){
        return res.status(402)
        .send('email is required and should be like: example@example.com')
    }
    
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if(!user){
       return res.status(401).send('user not found')
    }

    if(user.activated){
        return res.status(400).send('already activated')
    }
    const secretCode = await prisma.secretCode.findFirst({
        where: {
            email 
        }
    });
    if(secretCode){
        await prisma.secretCode.delete({
            where:{email},
        })}
        sendVerifyEmail(user)
        res.status(200).send()
}catch(e){
    res.status(404).send(e.message)
}
})
module.exports = router;