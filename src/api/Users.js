import { eventsSpaceApi } from 'config/axiosConfig';

export const createNewUser = () => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .get('api/users/create')
      .then(response => {
        res(response);
      })
      .catch(e => rej(e));
  });
};
