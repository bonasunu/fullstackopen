import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Blog test title',
    author: 'Blog test author',
    user: { username: 'johndoe' }
  }

  const user = { username: 'johndoe' }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  // component.debug()

  // method 1
  expect(component.container).toHaveTextContent(
    'Blog test title Blog test author'
  )

  // method 2
  const element = component.getByText(
    'Blog test title Blog test author'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.blogStyle')
  expect(div).toHaveTextContent(
    'Blog test title Blog test author'
  )

  // console.log(prettyDOM(div))
})

// test('clicking button calls event button handlers once', () => {
//   const blog = {
//     title: 'Blog test button',
//     author: 'Blog test author',
//     user: { username: 'johndoe' }
//   }

//   const user = { username: 'johndoe' }

//   const mockHandler = jest.fn()

//   const component = render(
//     <Blog blog={blog} user={user}/>
//   )

//   const button = component.getByText('remove')
//   fireEvent.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })


describe('<Toggleable />', () => {
  // eslint-disable-next-line no-unused-vars
  let component

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel='test div'>
        <div className='testDiv'></div>
      </Toggleable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()

    component.debug()
  })

  // test('at start the children is not displayed', () => {
  //   const div = component.container.querySelector('.toggleableContent')

  //   expect(div).toHaveStyle('display: none')
  // })

})

test('<BlogForm /> update parent state and calls on submit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleCreateBlog={createBlog}/>
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'testing form could be easier' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  // console.log(createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls[0][0].title).toBe('testing form could be easier')
})