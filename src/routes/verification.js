const cryptoRandomString = require('crypto-random-string');
require('dotenv').config({ path: '/src/.env' });
const sendEmail= require('../services/sendEmail')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const express = require('express');
const router = new express.Router();

const sendVerifyEmail = async (user) => {
    const userId = user.id
    const randomString = cryptoRandomString(6);
    try{
    await prisma.secretCode.create({
        data:{
            email:user.email,
            code:randomString
        }
    })
    const url = process.env.URL +'verification' + '/' + userId + '/' + randomString
    sendEmail (user.email,'Welcome to Book-store','verify your email',
    'please use the URL below to verify your Email: '+url)}catch(e){
        return e.message
    }
}

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
    try {
        const user =  await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })
        if (!user) {
            return res.status(401).send('user not found')
        }
        if (user.activated){
            return res.status(400).send('already activated')
        }
        const theSecretCode = await prisma.user.findUnique({
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

module.exports = router;
module.exports = sendVerifyEmail;