import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'BLOG_LIKE':
      return state.map((i) =>
        i.id === action.data.id
          ? { ...action.data, likes: action.data.likes }
          : i
      )
    case 'REMOVE_BLOG':
      return state.filter((i) => i.id !== action.data)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog)
    dispatch({
      type: 'BLOG_LIKE',
      data: blog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id,
    })
  }
}

export default reducer
