const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { response } = require('express')

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        return response.status(401).json({ error: 'invalid password' })
    }

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find()
        .find({}).populate('blogs')

    response.json(users.map(u => u.toJSON()))
})

module.exports = userRouter