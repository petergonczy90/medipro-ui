import axios from 'axios';
import keycloak from '@/lib/keycloak';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Bearer token to every outgoing request
api.interceptors.request.use((config) => {
  if (keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

// On 401, attempt a token refresh and retry the request once.
// If the refresh fails, redirect to the Keycloak login page.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await keycloak.updateToken(30);
        originalRequest.headers.Authorization = `Bearer ${keycloak.token}`;
        return axios(originalRequest);
      } catch {
        keycloak.login();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
