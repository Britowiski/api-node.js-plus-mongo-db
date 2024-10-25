import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

let users = []

app.post('/usuario', async (req, res) => {

    await prisma.users.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    users.push(req.body)
    res.status(201).json(req.body)
})
app.get('/usuario', async (req, res) => {
    let users = []

    if (req.query) {
        users = await prisma.users.findMany({
            where: {
                name: req.query.name
            }
        })
    }
    res.status(200).json(users)
})
app.put('/usuario/:id', async (req, res) => {
    await prisma.users.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuario/:id', async (req, res) => {
    await prisma.users.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: ' Usúario deletado com sucesso!' })
})

app.listen(3000)