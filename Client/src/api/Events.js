import { eventsSpaceApi } from 'config/axiosConfig';

export const getEvents = () => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .get('api/events/upcoming')
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};

export const createNewEvent = event => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .post('api/events/create', event)
      .then(response => {
        res(response);
      })
      .catch(e => rej(e));
  });
};

export const getEventDetails = async eventId => {
  try {
    const { data } = await eventsSpaceApi.get(`api/events/${eventId}/details`);
    return data;
  } catch (error) {
    return { error };
  }
};
