import { api } from './api';

export const getNotes = (params = {}) => {
  const q = new URLSearchParams();
  if (params.search) q.set('search', params.search);
  if (params.tag) q.set('tag', params.tag);
  const qs = q.toString();
  return api(`/notes${qs ? `?${qs}` : ''}`);
};

export const getNote = (id) => api(`/notes/${id}`);
export const createNote = (body) => api('/notes', { method: 'POST', body });
export const updateNote = (id, body) => api(`/notes/${id}`, { method: 'PUT', body });
export const pinNote = (id, pinned) => api(`/notes/${id}/pin`, { method: 'PATCH', body: { pinned } });
export const deleteNote = (id) => api(`/notes/${id}`, { method: 'DELETE' });