import { eventsSpaceApi } from 'config/axiosConfig';

export const getMyEventStatus = async (eventId, userId) => {
  try {
    const { data } = await eventsSpaceApi.get(
      `api/events/${eventId}/users/${userId}/status`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const updateMyEventStatus = async (eventId, userId, statusId) => {
  try {
    const { data } = await eventsSpaceApi.patch(
      `api/events/${eventId}/users/${userId}/status`,
      { statusId }
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const getEventTeamParticipants = async (eventId) => {
  try {
    const {
      data,
    } = await eventsSpaceApi.get(
      `api/events/${eventId}/participants`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const initEventTeamParticipants = async eventId => {
  try {
    const { data } = await eventsSpaceApi.put(
      `api/events/${eventId}/participants/init`
    );
    return data;
  } catch (error) {
    return { error };
  }
};

export const clearEventTeamParticipants = async eventId => {
  try {
    const { data } = await eventsSpaceApi.delete(
      `api/events/${eventId}/participants`
    );
    return data;
  } catch (error) {
    return { error };
  }
};
