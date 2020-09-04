import axios from 'axios';

export const APP_CONFIG = { URL: {} };
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
	APP_CONFIG.URL.eventsSpaceApiBasePath = process.env.REACT_APP_EVENTSSPACE_API;
} else {
	APP_CONFIG.URL.eventsSpaceApiBasePath = window.__env__.REACT_APP_EVENTSSPACE_API;
}

const opts = {
	baseURL: APP_CONFIG.URL.eventsSpaceApiBasePath,
	timeout: 100000,
	transformRequest: [
		(data, headers) => {
			const accessToken = localStorage.getItem('access_token');
			if (accessToken) {
				headers['Authorization'] = `Bearer ${accessToken}`;
			}
			return JSON.stringify(data);
		},
	],
	headers: {
		'Content-Type': 'application/json',
	},
};


export const eventsSpaceApi = axios.create(opts);

eventsSpaceApi.interceptors.response.use(response => response, error => Promise.reject(error.response));