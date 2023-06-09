import axios from 'axios';

export const axiosInstance = axios.create({
	baseURL: 'https://reactnd-books-api.udacity.com/',
});

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) config.headers.Authorization = token;
	return config;
});
