import api from './api';

export function createReservation(data, token) {
  return api.post('/reservations', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export function getMyReservations(token) {
  return api.get('/reservations/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
}
