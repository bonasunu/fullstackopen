const Blog = require('../models/blog')
const User = require('../models/user')

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

const nonExistingBlog = async () => {
    const blog = new Blog({
        title: 'Will remove this blog',
        author: 'Jane Doe',
        url: 'example.com',
        likes: 8
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    bloglist, nonExistingBlog, blogsInDb, usersInDb
}