@api
Feature: POST /users/login and GET /users/me

  @smoke
  Scenario: AC.1 - Valid credentials return an access token
    When I send a POST request to "/users/login" with email "admin@practicesoftwaretesting.com" and password "welcome01"
    Then the response status is 200
    And the response has an access token
    And the response property "token_type" is "bearer"

  @regression
  Scenario: Negative - Invalid password returns 401
    When I send a POST request to "/users/login" with email "admin@practicesoftwaretesting.com" and password "wrong-password"
    Then the response status is 401

  @smoke
  Scenario: AC.2 - GET /users/me returns the admin profile
    Given I have an admin API token
    When I send a GET request to "/users/me" with the admin token
    Then the response status is 200
    And the response property "email" is "admin@practicesoftwaretesting.com"
    And the response property "role" is "admin"

  @regression
  Scenario: Negative - GET /users without a token returns 401
    When I send a GET request to "/users"
    Then the response status is 401

  @regression
  Scenario: AC.3 - GET /users with an admin token returns a paginated list
    Given I have an admin API token
    When I send a GET request to "/users" with the admin token
    Then the response status is 200
    And the response data is a non-empty list
    And the response page number is 1
