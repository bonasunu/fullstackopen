const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')

jest.setTimeout(10000)

const api = supertest(app)

const listHelper = require('../utils/list_helpers')

const bloglist = [ 
    { 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7 
    }, 
    { 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(bloglist[0])
    await newBlog.save()

    newBlog = new Blog(bloglist[1])
    await newBlog.save()
})

const blogs = [ 
{ _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, 
{ _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, 
{ _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, 
{ _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, 
{ _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, 
{ _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

describe('total likes' , () => {
    test('total likes from blogs', () => {
        const result = blogs.reduce((sum, blog) => sum + blog.likes, 0)
        console.log(result)
        expect(result).toBe(36)
    })

    test('favourite blog', () => {
        const index = blogs.reduce((max, blog) => {
            if (max < blog.likes) {
                max = blog.likes
            }

            return max
        }, 0)
        console.log(index)

        const result = blogs.filter(blog => blog.likes === index)[0]
        delete result['_id']
        delete result['url']
        delete result['__v']

        console.log(result);

        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          })
    })
})

describe('test json', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are 2 blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })


})

describe('new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(bloglist.length + 1)
        expect(contents).toContain('Type wars')
    })

    test('blog without title and url is not added', async () => {
        const newBlog = {
            author: "Robert C. Martin", 
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(bloglist.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})