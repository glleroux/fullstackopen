describe('Blog app', function() {

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Cypress Test',
			username: 'cypress',
			password: 'cypresspassword'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function() {
		cy.contains('blogs')
	})

	it('login form can be opened', function() {
		cy.contains('login').click()
	})

	describe('Login', function() {
		it('succeeds with correct credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('cypress')
			cy.get('#password').type('cypresspassword')
			cy.get('#login-submit').click()
			cy.contains('Cypress Test logged in')
		})

		it('fails with wrong credentials', function () {
			cy.contains('login').click()
			cy.get('#username').type('cypress')
			cy.get('#password').type('wrongpassword')
			cy.get('#login-submit').click()
			cy.contains('Wrong credentials')
		})
	})

	describe('when logged in', function() {
		beforeEach(function() {
			cy.request('POST', 'http://localhost:3003/api/login', {
				username: 'cypress', password: 'cypresspassword'
			}).then(response => {
				localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
				cy.visit('http://localhost:3000')
			})
		})

		it('a new blog can be created', function() {
			cy.contains('new blog').click()
			cy.get('#title').type('cypress test title')
			cy.get('#author').type('cypress test author')
			cy.get('#url').type('cypress test url')
			cy.get('#blog-submit').click()
			cy.get('.blog').contains('cypress test title')
		})

		describe('and a blog exists', function() {
			beforeEach(function() {
				cy.contains('new blog').click()
				cy.get('#title').type('cypress test title')
				cy.get('#author').type('cypress test author')
				cy.get('#url').type('cypress test url')
				cy.get('#blog-submit').click()
				cy.get('.blog').contains('cypress test title')
			})

			it('it can be liked', function() {
				cy.get('.toggle-detail').click()
				cy.get('#like-submit').click()
			})

			it('it can be removed by its author', function() {
				cy.get('.toggle-detail').click()
				cy.get('#remove').click()
				cy.get('[data-cy="blog"]').should('not.exist')
			})

			it('blogs are ordered by number of likes', function(){
				cy.wait(1000)
				cy.contains('new blog').click()
				cy.get('#title').type('cypress test title2')
				cy.get('#author').type('cypress test author2')
				cy.get('#url').type('cypress test url2')
				cy.get('#blog-submit').click()
				cy.wait(1000)
				cy.get('.toggle-detail').eq(1).click()
				cy.get('#like-submit').click()
				cy.get('.blog').eq(1).should('contain', 'cypress test title2')
				cy.get('.blog').eq(0).should('contain', 'cypress test title')
			})
		})
	})
})