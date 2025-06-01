import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Volunteer (optional)
export const registerVolunteer = (data) => API.post('/volunteers', data);
export const getVolunteers = () => API.get('/volunteers');

// Posts (new)
export const createPost = (data) => API.post('/posts', data);
export const getPosts = () => API.get('/posts');
export const getUserPosts = (userId) => API.get(`/posts/user/${userId}`);

// Communities
export const createCommunity = (data) => API.post('/communities', data);
export const getCommunities = () => API.get('/communities');
export const getCommunityById = (id) => API.get(`/communities/${id}`);

// User Profile
export const getProfile = () => API.get('/auth/profile');
export const updateProfile = (data) => API.put('/auth/profile', data);
export const changePassword = (data) => API.put('/auth/change-password', data);

// Conservation Places
export const getConservationPlaces = () => API.get('/conservation-places');
export const getConservationPlace = (id) => API.get(`/conservation-places/${id}`);
export const createConservationPlace = (data) => API.post('/conservation-places', data);
export const updateConservationPlace = (id, data) => API.put(`/conservation-places/${id}`, data);
export const deleteConservationPlace = (id) => API.delete(`/conservation-places/${id}`);
