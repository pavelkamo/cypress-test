/// <reference types="cypress" />

describe('Upload file to user profile', () => {
    const userAndPass = `${Cypress.env('user')}:${Cypress.env('userPass')}`;
    const SERVICE_URL = `https://${userAndPass}@qauto.forstudy.space`;


    it('Update user profile image', () => {
        //Get main resource
        cy.visit(SERVICE_URL);

        //SignIn
        cy.request('POST', `${Cypress.config().baseUrl}/api/auth/signin`, {
            "email": Cypress.env('qakerEmail'),
            "password": Cypress.env('qakerPass'),
            "remember": false
        })

        //Update user profile image
        cy.visit(SERVICE_URL + `/panel/profile`)
        cy.get('button.btn-primary').click()
        cy.get('input#editProfilePhoto').selectFile('cypress/fixtures/qaker_logo.png')
        cy.intercept('PUT', 'api/users/profile').as('logo')
        cy.contains('button', 'Save').click()
        cy.get('@logo').its('response').then(res => {
            expect(res.statusCode).eq(200)
        })
    })
})