@api
Feature: GET /products

  @smoke
  Scenario: AC.1 - Returns a paginated product list
    When I send a GET request to "/products?page=1"
    Then the response status is 200
    And the response page number is 1
    And the response data is a non-empty list

  @regression
  Scenario: AC.2 - Search by name filters the results
    When I send a GET request to "/products/search?q=pliers"
    Then the response status is 200
    And the response data is a non-empty list
    And every product in the response has a name containing "pliers"

  @smoke
  Scenario: AC.3 - GET /products/{id} returns the product
    When I fetch the first product from the product list
    And I send a GET request for that product
    Then the response status is 200
    And the response matches that product

  @regression
  Scenario: Negative - Unknown product id returns 404
    When I send a GET request to "/products/00000000000000000000000000"
    Then the response status is 404
