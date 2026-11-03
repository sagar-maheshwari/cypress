# CLAUDE.md

Cypress + Cucumber (JavaScript) automation for https://automationexercise.com/ (UI) and https://automationexercise.com/api (API).

## Commands
- `npm test` - run all features
- `npm run smoke` / `npm run regression` - run scenarios tagged `@smoke` / `@regression`
- `npm run open` - Cypress runner (Chrome)
- `npx cypress run --expose tags=@001` - run by any tag expression (e.g. `"@ui and @smoke"`)
- `npm run lint` / `npm run prettier` - run by the husky pre-commit hook

Tags are passed with `--expose`, not `--env`: the Cucumber preprocessor reads them from `Cypress.expose` on Cypress 16.

## Structure
- `cypress/e2e/<feature>.feature` - Gherkin features
- `cypress/support/step_definitions/<domain>.js` - one flat, global set of steps (glob in `package.json`)
- `cypress/support/page_objects/<domain>.page.js` - one singleton class per page, one method per element
- `cypress/support/constants.js` - API root, UI error messages
- `cypress/support/account.js` - creates/deletes a throwaway user through the API (`create`, `remove`); the `After` hook in `common.js` always deletes it

## Conventions
- Feature-level tags: type (`@ui` / `@api`) and spec id (`@001`...). Scenario-level tags: scope (`@smoke` / `@regression`).
- Scenario titles: `AC.X - ...`, `Negative - ...`, `Edge - ...`.
- Steps are first person ("I search for ..."); assertions live in step definitions, not page objects.
- Selectors use `[data-qa="..."]` or ids, then role/text via `cy.contains`.
- `e2e.js` blocks ad/consent domains in a global `beforeEach`; their overlays otherwise cover the page.
- Tests needing a user use `Given a registered user exists` (API-created, unique email, deleted after the scenario).
- The API always returns HTTP 200 with a text/html body; the real status is `responseCode` in the JSON body. Steps parse it and assert `responseCode`.
- Do not extract a value into a named constant if it is used only once or twice in the same file. Inline it.
