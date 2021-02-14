export const isAuthenticated = () => {
	const accessToken = localStorage.getItem('access_token');
	return !!accessToken;
}

export const logout = () => {
	localStorage.removeItem('access_token');
}

export const getUserId = () => {
	return localStorage.getItem('userId');
}