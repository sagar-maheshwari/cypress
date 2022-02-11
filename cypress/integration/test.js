/// <reference types="Cypress" />
import testdata from '../fixtures/example.json'

describe('Verify the functionalities of Web Disclosure Public Site', () => {
  //open application before initiating tests
  beforeEach(() => {
    cy.visit('')
  })

  it('Verify that the grid displays all meetings that are associated with the filtered country', () => {
    //verify country filter is visible 
    cy.get('#filter-country').should('be.visible')
    //filter for the country as mentioned in the acceptance criteria
    cy.get('#txt-multiselect-static-search-CountryFilter').type(testdata.country)
    cy.get('#multiselect-static-content-CountryFilter div').click()
    cy.xpath('(//div[@id="filter-country"]//button)[1]').click()
    cy.wait(1000)
    //verify all entries on the country column match the filtered country
    cy.xpath('//tbody/tr/td[6]').each(($el, index, $list) => {
      expect($el).to.have.text(testdata.country)
    })
  })

  it('Verify that the vote card page is launching as expected', () => {
    cy.get('#grid').should('be.visible')
    //search for the company as mentioned in the acceptance criteria
    cy.get('#kendo-Search-for-company').type(testdata.company)
    cy.wait(1000)
    cy.get('#kendo-Search-for-company').type('{enter}')
    //verify user lands on vote card page and has the company name on the banner
    cy.get('#meeting-detail-th-span-VoteDecision').should('be.visible')
    cy.get('#detail-issuer-name').should('have.text', testdata.company)
  })
})