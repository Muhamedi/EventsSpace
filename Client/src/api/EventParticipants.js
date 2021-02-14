import { eventsSpaceApi } from 'config/axiosConfig';

export const getMyEventStatus = async (eventId, userId) => {
  try {
    const { data } = await eventsSpaceApi.get(
      `api/event-participants/${eventId}/users/${userId}/status`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const updateMyEventStatus = async (eventId, userId, statusId) => {
  try {
    const {
      data,
    } = await eventsSpaceApi.patch(
      `api/event-participants/${eventId}/users/${userId}/status`,
      { statusId }
    );
    return data;
  } catch (error) {
    return { error };
  }
};
