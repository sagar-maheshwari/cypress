# Automation Exercise - Cypress + Cucumber automation

Cypress + Cucumber tests for https://automationexercise.com/ (UI) and its API.

## Getting started
Requires Node 26 or later.

```
npm install
```

## Running tests
| Command | What it does |
| --- | --- |
| `npm test` | all features |
| `npm run smoke` | `@smoke` scenarios only |
| `npm run regression` | `@regression` scenarios only |
| `npx cypress run --expose tags=@ui` | any tag expression |
| `npx cypress run --spec cypress/e2e/login.feature` | a single feature |
| `npm run open` | interactive runner |

The Cucumber HTML report is written to `test-results/cucumber/cucumber_report.html`; failure screenshots go to `test-results/screenshots`.

## Test structure
Features in `cypress/e2e`, steps in `cypress/support/step_definitions`, page objects in `cypress/support/page_objects`. See `CLAUDE.md` for conventions.

## CI
- GitHub Actions: `.github/workflows/smoke.yml` runs `npm run smoke` on `ubuntu-latest` (Node 26, headless Chrome) for pull requests and manual runs. Use "Run workflow" to pass a different command, e.g. `npm test`. The Cucumber report and failure screenshots are uploaded as artifacts.

## Troubleshooting
| Symptom | Fix |
| --- | --- |
| Tag filter has no effect | use `--expose tags=...`, not `--env tags=...` (Cypress 16) |
| Cypress binary missing | `npx cypress install` |
