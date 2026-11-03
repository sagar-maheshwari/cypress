@ui @001
Feature: Login, sign up, search and cart

  @smoke
  Scenario: AC.1 - Registered user logs in with correct email and password
    Given a registered user exists
    And I am on the login page
    When I log in with the registered user
    Then I am logged in with the registered user name

  @regression
  Scenario: Negative - Login with incorrect email and password shows an error
    Given I am on the login page
    When I log in with email "nobody@example.com" and password "wrong-password"
    Then I see the invalid login error

  @regression
  Scenario: Negative - Signing up with an existing email shows an error
    Given a registered user exists
    And I am on the login page
    When I sign up with the registered user email
    Then I see the existing email error

  @smoke
  Scenario: AC.2 - Searching for a product lists matching products
    Given I am on the products page
    When I search for "jeans"
    Then I see the searched products heading
    And every product shown is related to "jeans"

  @regression
  Scenario: AC.3 - Product quantity is kept in the cart
    Given I am on the details page of product 1
    When I add 4 of the product to the cart and open the cart
    Then the cart shows a quantity of 4
