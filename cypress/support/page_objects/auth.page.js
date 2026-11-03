class authPage {
	loginEmail() {
		return cy.get('[data-qa="login-email"]');
	}

	loginPassword() {
		return cy.get('[data-qa="login-password"]');
	}

	loginButton() {
		return cy.get('[data-qa="login-button"]');
	}

	signupName() {
		return cy.get('[data-qa="signup-name"]');
	}

	signupEmail() {
		return cy.get('[data-qa="signup-email"]');
	}

	signupButton() {
		return cy.get('[data-qa="signup-button"]');
	}

	loggedInAs() {
		return cy.contains('li', 'Logged in as');
	}
}

module.exports = new authPage();
