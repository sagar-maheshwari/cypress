@ui
Feature: Admin users
  Background:
    Given I am logged in as the admin user
    And I navigate to the admin users page

  @smoke
  Scenario: AC.1 - Admin can view the users list
    Then I see the users list

  @regression
  Scenario: AC.2 - Admin can search users by last name
    When I search users for "Doe"
    Then I see a user row containing "Doe"
