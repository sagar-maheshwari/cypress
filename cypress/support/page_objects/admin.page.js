class adminPage {
	pageTitle() {
		return cy.get('[data-test="page-title"]');
	}

	userSearchInput() {
		return cy.get('[data-test="user-search-query"]');
	}

	userSearchSubmit() {
		return cy.get('[data-test="user-search-submit"]');
	}

	userRows() {
		return cy.get('table tbody tr');
	}
}

module.exports = new adminPage();
