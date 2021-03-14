const express = require('express')
const router = new express.Router
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const validator = require ('validator')


router.post('/user/signup', async (req,res) => {
    try{
        const input = req.body
        if(!input.email || !input.password || !input.last_name || !input.first_name || !req.body.re-password){
            return res.status(400).send ('incomplete info')
        }
        if(!input.password === input.re-password){
            return res.status(401).send('passwords should match')
        }     

            if(!validator.isEmail(req.body.email)){
               return res.status(402).send('email should be like: example@example.com')
            }              
       
        const hashedPassword = await bcrypt.hash(req.body.password,8)

        const user = await prisma.user.create({
            data:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                password:hashedPassword,
                email:req.body.email
            }
        })
        console.log(user)
        res.status(200).send()}catch(e){
            res.status(404).send(e.message)
        }
})

module.exports=router