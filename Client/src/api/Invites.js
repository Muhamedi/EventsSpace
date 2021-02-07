import { eventsSpaceApi } from 'config/axiosConfig';

export const updateInvite = ({ userId, inviteId, eventId, status }) => {
  return new Promise((res, rej) => {
    eventsSpaceApi
      .put(`api/invites/${inviteId}`, {
        userId,
        eventId,
        status,
      })
      .then(response => {
        res(response.data);
      })
      .catch(e => rej(e));
  });
};
