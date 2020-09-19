import { eventsSpaceApi } from 'config/axiosConfig';

export const getParticipantTypes = () => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .get('api/participant-types')
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};

