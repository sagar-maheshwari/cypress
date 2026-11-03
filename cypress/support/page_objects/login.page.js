class loginPage {
	emailInput() {
		return cy.get('[data-test="email"]');
	}

	passwordInput() {
		return cy.get('[data-test="password"]');
	}

	submitButton() {
		return cy.get('[data-test="login-submit"]');
	}

	errorMessage() {
		return cy.get('[data-test="login-error"]');
	}

	userMenu() {
		return cy.get('[data-test="nav-menu"]');
	}
}

module.exports = new loginPage();
