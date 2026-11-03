@ui
Feature: Product browse, search and cart
  Background:
    Given I am on the home page

  @smoke
  Scenario: AC.1 - Home page lists products
    Then I see a list of products

  @smoke
  Scenario: AC.2 - Search returns matching products
    When I search for "Pliers"
    Then every product name contains "pliers"

  @regression
  Scenario: Negative - Search with no match shows no products
    When I search for "zzzznotaproduct"
    Then I see no products

  @smoke
  Scenario: AC.3 - Add a product to the cart updates the cart count
    When I open the product "Combination Pliers"
    Then the product page shows "Combination Pliers"
    When I add the product to the cart
    Then the cart quantity is "1"
