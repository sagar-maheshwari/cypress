import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';

export default [
	{ ignores: ['node_modules/**', 'test-results/**'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	{ ...pluginCypress.configs.recommended, rules: { 'cypress/unsafe-to-chain-command': 'warn' } },
];
