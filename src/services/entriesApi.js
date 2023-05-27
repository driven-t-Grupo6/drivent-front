import api from './api';

export async function getEntriesByActivityId(token, activityId) {
  const response = await api.get(`/entries/activity/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
