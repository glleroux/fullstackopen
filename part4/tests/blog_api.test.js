const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there are blogs present', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })

    test('unique identifier is "id"', async () => {
        const response = await api.get('/api/blogs')
        const blog = response.body[0]
        expect(blog.id).toBeDefined()
    });

})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const result = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body).toEqual(blogToView)
    })

    // test('fails if note does not exist', async () => {
    //     const nonExistingId = helper.nonExistingId()

    //     const result = await api
    //         .get(`/api/blogs/${nonExistingId}`)
    //         .expect(404)
    // })
})


describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {

        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const titles = response.body.map(b => b.title)
    
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(helper.newBlog.title) 
    })

    test('sets likes to zero if missing', async () => {
    
        const response = await api
            .post('/api/blogs')
            .send(helper.blogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.likes).toBeDefined()
    })

    test('fails if title or author missing', async () => {
    
        await api
            .post('/api/blogs')
            .send(helper.blogNoTitle)
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(helper.blogNoAuthor)
            .expect(400)
        
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })
})

describe('deleting a blog', () => {
    test('succeeds with 204 if valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    })
})

describe('updating a blog', () => {
    test('succeeds if valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const newContent = {...blogToUpdate, title: 'title has been updated'}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newContent)
            .expect(200)
        
        const updatedBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)
        expect(updatedBlog.body.title).toBe('title has been updated')
    })
})

afterAll(() => {
    mongoose.connection.close()
})