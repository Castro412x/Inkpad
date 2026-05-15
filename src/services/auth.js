import { api } from './api';

export async function register(name, email, phone, password) {
  return api('/auth/signup', {
    method: 'POST',
    body: { name, email, phone, password},
    auth: false,
  });
}

export async function login(email, password) {
  return api('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
}

export async function getMe() {
  return api('/auth/me');
}