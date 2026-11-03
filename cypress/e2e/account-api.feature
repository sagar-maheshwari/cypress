@api @003
Feature: Account API

  @smoke
  Scenario: AC.1 - POST createAccount creates a user
    When I create a new account through the API
    Then the API response code is 201
    And the API response message is "User created!"

  @smoke
  Scenario: AC.2 - POST verifyLogin with valid credentials finds the user
    Given a registered user exists
    When I verify the login of the registered user
    Then the API response code is 200
    And the API response message is "User exists!"

  @regression
  Scenario: Negative - POST verifyLogin with invalid credentials returns 404
    When I verify the login with email "nobody@example.com" and password "wrong-password"
    Then the API response code is 404
    And the API response message is "User not found!"

  @regression
  Scenario: Negative - POST verifyLogin without email returns 400
    When I send a POST request to "/verifyLogin" with "password" "wrong-password"
    Then the API response code is 400
    And the API response message is "Bad request, email or password parameter is missing in POST request."

  @regression
  Scenario: AC.3 - GET getUserDetailByEmail returns the user details
    Given a registered user exists
    When I get the user details of the registered user
    Then the API response code is 200
    And the API user detail email matches the registered user
