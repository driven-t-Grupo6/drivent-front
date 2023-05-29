import api from './api';

export async function getEntriesByActivityId(token, activityId) {
  const response = await api.get(`/entries/activity/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getEntriesByUserId(token) {
  const response = await api.get('/entries/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createEntry(token, activityId) {
  const response = await api.post(
    `/entries/activity/${activityId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteEntry(token, id) {
  const response = await api.delete(`/entries/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
