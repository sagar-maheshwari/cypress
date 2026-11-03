const API_ROOT = 'https://api.practicesoftwaretesting.com';

const USER = {
	admin: 'admin@practicesoftwaretesting.com',
};

const PASSWORD = 'welcome01';

const API = {
	LOGIN: `${API_ROOT}/users/login`,
	ME: `${API_ROOT}/users/me`,
	USERS: `${API_ROOT}/users`,
	PRODUCTS: `${API_ROOT}/products`,
};

const messages = {
	invalidLogin: 'Invalid email or password',
};

module.exports = { API_ROOT, USER, PASSWORD, API, messages };
