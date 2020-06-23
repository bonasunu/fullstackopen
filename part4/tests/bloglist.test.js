const { TestScheduler } = require('jest')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./blog_helpers')
const bcrypt = require('bcrypt')
const User = require('../models/user')

jest.setTimeout(10000)

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let newBlog = new Blog(helper.bloglist[0])
    await newBlog.save()

    newBlog = new Blog(helper.bloglist[1])
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
    //TODO
    test('a valid blog without valid token cannot be added', async () => {
        const newBlog = {
            title: "Type wars", 
            author: "Robert C. Martin", 
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
            likes: 2,
            userId: '5ef0dbb20da8bd0bfe6df29d'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.bloglist.length)
        //expect(contents).toContain('Type wars')
    })

    //TODO
    test('blog without valid token, title and url is not added', async () => {
        const newBlog = {
            author: "Robert C. Martin", 
            likes: 4,
            userId: '5ef0dbb20da8bd0bfe6df29d'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.bloglist.length)
    })

    //TODO test('delete')
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async ()=> {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mandy',
            name: 'Mandy CJ',
            password: 'aaaaa'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length + 1)

        const usernames = userAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'aaaaa',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password less than 3 characters', async () => {
        
        const usersAtStart = await helper.usersInDb()
        
        const newUser = {
            username: 'jane',
            name: 'Jane Doe',
            password: 'a'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
