import axios from "axios";


const api = axios.create({ baseURL: 'http://localhost:3000/admin' })


api.interceptors.request.use(async (config) => {
    // const token = localStorage.getItem("token");
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJfaWQiOiI2M2ExNGYzYmUxMzQxY2E1OGEzNGIwMTIiLCJzdGF0dXMiOnRydWUsIm5hbWUiOiJEb2NraW4gQWRtaW4iLCJlbWFpbCI6ImFkbWluQGRvY2tpbi5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ2Lnh3dHpTQkpMazBPMXZ5dzlYTEFPNTZRLmxIWGVWSk9KYXVYQWQweXdOSjJhajlWVjFWaSIsImNyZWF0ZWRBdCI6IjIwMjItMTItMjBUMDU6NTk6MjMuNjM5WiIsInVwZGF0ZWRBdCI6IjIwMjItMTItMjBUMDU6NTk6MjMuNjM5WiIsIl9fdiI6MH0sImlhdCI6MTY3MTUxNzA1NiwiZXhwIjoxNjc0MTA5MDU2LCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvYWRtaW4iLCJzdWIiOiI2M2ExNGYzYmUxMzQxY2E1OGEzNGIwMTIifQ.9z_VmTLfFuLAdMxGGm589N3ulyl-lGvatsl8PkjAIgE';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.ContentType = 'application/jsonp';
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;