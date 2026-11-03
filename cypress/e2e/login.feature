@ui @001
Feature: Login
  Background:
    Given I am on the login page

  @smoke
  Scenario: AC.1 - Admin logs in and lands on the admin dashboard
    When I log in with email "admin@practicesoftwaretesting.com" and password "welcome01"
    Then I am taken to the admin dashboard

  @regression
  Scenario Outline: Negative - <case> shows an error
    When I log in with email "<email>" and password "<password>"
    Then I see the login error "Invalid email or password"
    And I remain on the login page

    Examples:
      | case             | email                             | password       |
      | Invalid password | admin@practicesoftwaretesting.com | wrong-password |
      | Unknown email    | nobody@example.com                | welcome01      |
