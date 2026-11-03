@api @002
Feature: Products and brands API

  @smoke
  Scenario: AC.1 - GET productsList returns all products
    When I send a GET request to "/productsList"
    Then the API response code is 200
    And the API response has a non-empty "products" list

  @regression
  Scenario: Negative - POST productsList is not supported
    When I send a POST request to "/productsList"
    Then the API response code is 405
    And the API response message is "This request method is not supported."

  @smoke
  Scenario: AC.2 - GET brandsList returns all brands
    When I send a GET request to "/brandsList"
    Then the API response code is 200
    And the API response has a non-empty "brands" list

  @smoke
  Scenario: AC.3 - POST searchProduct returns matching products
    When I send a POST request to "/searchProduct" with "search_product" "jeans"
    Then the API response code is 200
    And the API response has a non-empty "products" list
    And every product in the API response has a name containing "jeans"

  @regression
  Scenario: Negative - POST searchProduct without search_product returns 400
    When I send a POST request to "/searchProduct"
    Then the API response code is 400
    And the API response message is "Bad request, search_product parameter is missing in POST request."
