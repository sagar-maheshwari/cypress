/// <reference types="Cypress" />

describe('Verify the functionalities of Web Disclosure Public Site', () => {
    it('Verify that the grid displays all meetings that are associated with the country', () => {
      cy.visit('')
      cy.get('#filter-country').should('be.visible')
      cy.get('#txt-multiselect-static-search-CountryFilter').type('Belgium')
      cy.get('#multiselect-static-content-CountryFilter div').click()
      cy.xpath('(//div[@id="filter-country"]//button)[1]').click()
      cy.wait(1000)
      cy.xpath('//tbody/tr/td[6]').each(($el, index, $list) => {
        expect($el).to.have.text('Belgium')
        expect($el).to.not.have.text('Germany')
      })
    })

    
  })