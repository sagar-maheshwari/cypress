/// <reference types="Cypress" />
import testdata from '../fixtures/example.json'

describe('Verify the functionalities of Web Disclosure Public Site', () => {

  it('Verify that the grid displays all meetings that are associated with the filtered country', () => {
    cy.visit('')
    cy.get('#filter-country').should('be.visible')
    cy.get('#txt-multiselect-static-search-CountryFilter').type(testdata.country)
    cy.get('#multiselect-static-content-CountryFilter div').click()
    cy.xpath('(//div[@id="filter-country"]//button)[1]').click()
    cy.wait(1000)
    cy.xpath('//tbody/tr/td[6]').each(($el, index, $list) => {
      expect($el).to.have.text(testdata.country)
    })
  })

  it('Verify that the vote card page is launching as expected', () => {
    cy.visit('')
    cy.get('#grid').should('be.visible')
    cy.get('#kendo-Search-for-company').type(testdata.company)
    cy.wait(1000)
    cy.get('#kendo-Search-for-company').type('{enter}')
    cy.get('#meeting-detail-th-span-VoteDecision').should('be.visible')
    cy.get('#detail-issuer-name').should('have.text', testdata.company)
  })
})