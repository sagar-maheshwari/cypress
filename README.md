# cypress automation

## Setting up the project

1. Clone the repository and navigate to the root directory
2. Run 'yarn install' to install all the dependencies
3. Run 'npx cypress verify' to verify cypress is installed successfully

## Project Structure

1. All tests are available under 'cypress/integration' folder
2. All testdata is available under 'cypress/fixtures' folder
3. Configuration file is available in the root directory as 'cypress.json'
4. On failure, screenshot would be captured in the 'cypress/screenshots' directory.

## Running the tests

1. To run all the test, use below commands:
    
    a. headlessly: 'yarn cypress:run'
    
    b. chrome: 'yarn cypress:run --browser chrome --headed'

    c. firefox: 'yarn cypress:run --browser firefox --headed'

Note: Electron is the default browser for execution. You can pass the required browser with the '--browser' command. Please ensure the browser is installed in your system. To run tests in headed mode, add the flag '--headed'. Without the flag, tests would run headless.


## Run via docker

Run the tests with default configurations by running the command 'docker run -it -v ${PWD}:/e2e -w /e2e cypress/included:9.4.1'

You can change a host of configurations on runtime like browser, baseUrl. Details: https://docs.cypress.io/guides/references/configuration#Global & https://docs.cypress.io/guides/guides/environment-variables#Option-4-env

Eg: run this command to change browser and baseurl: 'docker run -it -v ${PWD}:/e2e -w /e2e  -e baseUrl=https://www.google.com cypress/included:9.4.1 --browser chrome'