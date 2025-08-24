import api from './api';

export function createReservation(data, token) {
  return api.post('/reservations', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getMyReservations(token) {
  const { data } = await api.get('/reservations/me', {
    headers: { Authorization: `Bearer ${token}` }
  });

  return data.map(r => ({
    ...r,
    finalPrice: r.finalPrice ?? r.totalPrice + r.totalPrice * 0.1 * (r.lateHours || 0)
  }));
}
