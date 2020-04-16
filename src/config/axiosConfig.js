import axios from 'axios';

export const APP_CONFIG = { URL: {} };
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
	APP_CONFIG.URL.eventsSpaceApiBasePath = process.env.REACT_APP_EVENTSSPACE_API;
} else {
	APP_CONFIG.URL.eventsSpaceApiBasePath = window.__env__.REACT_APP_EVENTSSPACE_API;
}

const opts = {
	baseURL: APP_CONFIG.eventsSpaceApiBasePath,
	timeout: 100000,
	headers: {
		'Content-Type': 'application/json',
	},
};

export const eventsSpaceApi = axios.create(opts);