import { Given, After } from '@badeball/cypress-cucumber-preprocessor';
import { create, remove } from '../account';

Given('a registered user exists', () => {
	create();
});

After(() => {
	remove();
});
