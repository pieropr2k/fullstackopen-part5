const blog = {
  title: 'Nuevo blogsito',
  author: 'Lets add',
  url: 'Anderson'
}
const blogs = [
  {
    title: 'Blog1',
    author: 'Chris Bell',
    url: 'mrh.com',
    likes: 94
  },
  {
    title: 'Blog Two',
    author: 'James D',
    url: 'blue.com',
  },
  {
    title: 'No Guidance',
    author: 'Lautaro',
    url: 'yougot.net',
    likes: 25
  }
]

const blogsToOrder = [
  {
    title: 'Blog One',
    author: 'Chris Stallone',
    url: 'lee.com',
    likes: 5
  },
  {
    title: 'Blog Two',
    author: 'James D',
    url: 'blue.com',
  },
  {
    title: 'Blog Three',
    author: 'Rodo Montaner',
    url: 'order.com',
  }
]

const foreignUserBlogs = [
  {
    title: 'BlogFk1',
    author: 'Christian',
    url: 'open.com',
    likes: 51
  },
  {
    title: 'Blog Fk 2',
    author: 'Jair W',
    url: 'gree.com',
    likes: 15
  },
  {
    title: 'Do You?',
    author: 'Rocky',
    url: 'italia.pe',
  }
]

const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen'
}
const secondUser = {
  name: 'Nicolas Cancelo',
  username: 'latamking10',
  password: 'guerrero'
}

describe('Blog app', function () {
  beforeEach(function () {
    // To use the beforeEach only with the tests that are out of the describe 'Second user login'
    //console.log(this.currentTest.titlePath())
    if (!this.currentTest.titlePath().includes('Second user login')) {
      //Second user logins
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      // create here a user to backend
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
      cy.visit('http://localhost:3000')
    }
  })

  // Exercise 5.17
  it('Login form is shown', function () {
    // if the Login form is loaded correctly
    cy.get('#login-button').click()
    cy.contains('Log in to application')
  })

  // Exercise 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // if the user put the correct data
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      // if the user put the wrong username or/and password
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      //cy.get('.error').contains('invalid username or password')
      //cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      //cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('.error').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  // Exercise 5.19
  describe('When logged in', function () {
    // We gonna use this beforeEach only with the tests that are not  for the second user
    beforeEach(function () {
      if (!this.currentTest.titlePath().includes('Second user logins')) {
        // log in user here
        cy.login({ username: user.username, password: user.password })
      }
    })
    describe('First user login', function () {
      /*beforeEach(function () {
        // log in user here
        cy.login({ username: user.username, password: user.password })
      })*/
      it('A blog can be created', function () {
        // ...
        console.log(JSON.parse(localStorage.getItem('loggedBlogappUser')).token, 'first')
        cy.contains('new blog').click()
        cy.get('input:first').type(blog.title)
        cy.get('form div:nth-of-type(2) input').type(blog.author)
        cy.get('input:last').type(blog.url)
        //cy.contains('create').click()
        cy.get('button[type="submit"]').click()
        cy.contains(blog.title)
      })

      // Exercise 5.20
      describe('Like button usage', function () {
        beforeEach(function () {
          blogs.forEach(element => {
            cy.createBlog(element)
          })
          //cy.createNote({ content: 'first note', important: false })
          //cy.createNote({ content: 'second note', important: false })
          //cy.createNote({ content: 'third note', important: false })
        })

        it('like button is reflected in the app', function () {
          cy.contains(blogs[0].title)
            .contains('view')
            .click()
          cy.contains(blogs[0].title).parent().find('.likesInfo').as('likesInfo')
          cy.get('@likesInfo').find('button').click()
          cy.get('@likesInfo').should('contain', blogs[0].likes + 1)
          //localStorage.removeItem('loggedBlogappUser')
          //cy.visit('http://localhost:3000')
        })
      })
    })

    // Exercise 5.21
    describe('Second user login', function () {
      beforeEach(function () {
        // log in 2nd user here
        cy.login({ username: secondUser.username, password: secondUser.password })
      })
      describe('Blog deletion test', function () {
        beforeEach(function () {
          if (this.currentTest.title !== 'The user cannot delete a blog that he did not created') {
            foreignUserBlogs.forEach(element => {
              cy.createBlog(element)
            })
          }
        })
        it('The user who created a blog can delete it', function () {
          // The user who is logged in the app can delete their own blogs
          cy.contains(foreignUserBlogs[0].title)
            .contains('view')
            .click()
          cy.contains(foreignUserBlogs[0].title).parent().find('.removeBlog').as('removeBlogButton')
          cy.get('@removeBlogButton').click()
        })
        it('The user cannot delete a blog that he did not created', function () {
          // The user who is logged in the app cannot delete the blogs that are not on his own
          //cy.contains('blogs')
          cy.contains(blogs[0].title)
            .contains('view')
            .click()
          cy.contains(blogs[0].title).parent().find('.removeBlog').as('removeBlogButton')
          cy.get('@removeBlogButton').click()

          cy.get('.error')
            .should('contain', 'you cannot delete nothing by a wrong user')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        })
      })
    })

    // Exercise 5.22
    describe('Order of blogs', function () {
      beforeEach(function () {
        blogsToOrder.forEach(element => {
          cy.createBlog(element)
        })
      })
      it('The blogs are ordered according to likes', function () {
        [1, 2].forEach((index) => {
          cy.contains(blogsToOrder[index].title)
            .contains('view')
            .click()
          cy.get('.blog').eq(index).parent().find('.likesInfo').as('likesInfo')
          //cy.contains(blogsToOrder[index].title).parent().find('.likesInfo').as('likesInfo')
          let n = 0
          // the test clicks on the 'like' button
          while (n < index + 2) {
            cy.get('@likesInfo').find('button').click()
            n++
            if (n !== index + 2) {
              cy.wait(2000)
            }
          }
        })
        cy.contains(blogsToOrder[0].title)
          .contains('view')
          .click()
        // check if the order of the blogs is descending and correct
        cy.get('.numberOfLikes').then($blogsLikes => {
          const blogsLikes = [...$blogsLikes].map(div => parseInt(div.innerText.slice(6)))
          console.log(blogsLikes)
          const vectorIsOrdered = (array) => {
            for (let index = 1; index < array.length; index++) {
              if(array[index - 1] < array[index])
                return false
            }
            return true
          }
          expect(vectorIsOrdered(blogsLikes)).to.be.true
        })
      })
    })
  })
})