require('dotenv').config({ path: './src/.env' })
const cryptoRandomString = require('crypto-random-string');
const sendEmail = require('./sendEmail')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
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
   
    const url = process.env.URL + 'verification/' + userId + '/' + randomString
    sendEmail (user.email,'Welcome to Book-store','verify your email',
    'please use the URL below to verify your Email: '+url)
}catch(e){
        return (e.message)
    }
  }
  module.exports = sendVerifyEmail;