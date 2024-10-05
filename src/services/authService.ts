import api from './axiosConfig';

const AUTH = "/auth";

export const register = async (userData: any) => {
  const response = await api.post(`${AUTH}/register`, userData);
  return response.data;
};

export const login = async (userData: any) => {
  const response = await api.post(`${AUTH}/login`, userData);
  return response.data;
};
