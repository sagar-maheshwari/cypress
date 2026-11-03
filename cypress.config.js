const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const stdLibBrowser = require('node-stdlib-browser');
const plugin = require('node-stdlib-browser/helpers/esbuild/plugin');

async function setupNodeEvents(on, config) {
	await preprocessor.addCucumberPreprocessorPlugin(on, config);

	on(
		'file:preprocessor',
		createBundler({
			inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
			define: {
				global: 'global',
				process: 'process',
				Buffer: 'Buffer',
			},
			plugins: [plugin(stdLibBrowser), createEsbuildPlugin(config)],
		})
	);

	on('task', {
		log(message) {
			console.log(message);
			return null;
		},
	});

	return config;
}

module.exports = defineConfig({
	defaultCommandTimeout: 10000,
	requestTimeout: 5000,
	responseTimeout: 15000,
	pageLoadTimeout: 20000,
	numTestsKeptInMemory: 1,
	screenshotsFolder: 'test-results/screenshots',
	videosFolder: 'test-results/videos',
	viewportWidth: 1600,
	viewportHeight: 900,
	watchForFileChanges: false,
	screenshotOnRunFailure: true,
	video: false,
	reporter: 'spec',
	retries: { runMode: 1, openMode: 0 },
	e2e: {
		setupNodeEvents,
		baseUrl: 'https://automationexercise.com',
		specPattern: '**/*.feature',
	},
});
