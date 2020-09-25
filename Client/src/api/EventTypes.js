import { eventsSpaceApi } from 'config/axiosConfig';

export const getEventTypes = () => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .get('api/event-types')
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};

