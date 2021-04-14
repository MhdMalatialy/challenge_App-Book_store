const express = require('express')
const router = new express.Router
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/user/search',async (req,res) => {
    const query = req.query.q
    if (!query){
        return res.status(400).send('no thing to search')
    }
    const result = await prisma.books.findFirst({
        where:{
            title:query
        }
    })
    if(!result){
        return res.status(401).send('The book not found')
    }
    res.status(200).send({result})
})

module.exports = router
