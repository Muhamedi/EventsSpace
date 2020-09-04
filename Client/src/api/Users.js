import { eventsSpaceApi } from 'config/axiosConfig';

export const createNewUser = (user) => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .post('api/users/create', user)
      .then(response => {
        res(response);
      })
      .catch(e => rej(e));
  });
};

export const login = (email, password) => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .post('api/users/login', {
        email,
        password,
      })
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};

export const activateUser = (userId, email, activationId) => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .post(`api/users/${userId}/activation?id=${activationId}&email=${email}`)
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};
