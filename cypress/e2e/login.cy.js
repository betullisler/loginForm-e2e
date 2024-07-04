describe('Login page tests', () => {
    beforeEach(() => {

        cy.visit('http://localhost:5173/');
    });

    it('login form submit test', () => {

        cy.get('[data-cy="login-email-input"]').type("betulisler16@gmail.com");
        cy.get('[data-cy="login-password-input"]').type("12345");
        cy.get('[data-cy="login-terms-input"]').check();
        cy.get('[data-cy="login-submit-btn"]').click();
    });
});
