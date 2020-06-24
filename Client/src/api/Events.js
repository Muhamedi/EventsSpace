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
