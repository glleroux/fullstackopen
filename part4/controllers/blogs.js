const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
  
blogsRouter.post('/', async (request, response) => {
  const newBlog = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid or missing'})
  }

  const user = await User.findById(decodedToken.id)

  if (!newBlog.title || !newBlog.author) {
    response.status(400).end()
  } else {
      const blog = new Blog({...newBlog, user: user._id})
      blog.likes = newBlog.likes || 0
      const savedBlog = await blog.save()
      const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1, id: 1 });
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    response.status(404).end()
  } else {
    response.status(200).json(blog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.title || !request.body.author) {
    response.status(400).end()
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
    console.log(updatedBlog)
    response.status(200).json(updatedBlog)
  }
  
})

module.exports = blogsRouter
