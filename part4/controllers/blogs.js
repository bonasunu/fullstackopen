const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { request } = require('../app')
const { response } = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())

})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id.toString())

  if (blogToDelete.user === decodedToken.id) {
    await Blog.findByIdAndRemove(request.params.id.toString())
    response.status(204).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogRouter