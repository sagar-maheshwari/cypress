# CLAUDE.md

Cypress + Cucumber (JavaScript) automation for https://practicesoftwaretesting.com/ (UI) and https://api.practicesoftwaretesting.com (API). Framework standards mirror `votingportal-automation-tests`.

## Commands
- `npm test` - run all features
- `npm run smoke` / `npm run regression` - run scenarios tagged `@smoke` / `@regression`
- `npm run open` - Cypress runner (Electron)
- `npx cypress run --expose tags=@001` - run by any tag expression (e.g. `"@ui and @smoke"`)
- `npm run lint` / `npm run prettier` - run by the husky pre-commit hook

Tags are passed with `--expose`, not `--env`: the Cucumber preprocessor reads them from `Cypress.expose` on Cypress 16.

## Structure
- `cypress/e2e/<feature>.feature` - Gherkin features
- `cypress/support/step_definitions/<domain>.js` - one flat, global set of steps (glob in `package.json`)
- `cypress/support/page_objects/<domain>.page.js` - one singleton class per page, one method per element
- `cypress/support/constants.js` - users, password, API URLs, messages
- `cypress/support/commands.js` - `loginWithAdmin` (cached with `cy.session`), `getAdminToken`, `statusCode200`

## Conventions
- Feature-level tags: type (`@ui` / `@api`) and spec id (`@001`...). Scenario-level tags: scope (`@smoke` / `@regression`).
- Scenario titles: `AC.X - ...`, `Negative - ...`, `Edge - ...`.
- Steps are first person ("I search for ..."); assertions live in step definitions, not page objects.
- Selectors use `[data-test="..."]`, then role/text via `cy.contains`.
- Wait on network with `cy.intercept(...).as(...)` + `cy.wait`/`cy.statusCode200`; never `cy.wait(<ms>)`. The site loads products with a non-GET method, so product intercepts match any method.
- Authenticated UI features use `Given I am logged in as the admin user`; the login feature itself uses the form.
- API steps use `cy.request` with `failOnStatusCode: false` and always assert the status.
- Do not extract a value into a named constant if it is used only once or twice in the same file. Inline it.
