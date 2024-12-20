import axios from "./axios.js";

export const registerRequest = async (user) => axios.post(`/auth/register`, user);
//  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const logoutRequest = async () => axios.post(`/auth/logout`);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
