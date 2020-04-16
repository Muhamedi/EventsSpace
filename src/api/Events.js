import { eventsSpaceApi } from 'config/axiosConfig';

export const getEvents = () =>{
    return new Promise((res, rej) => {
        eventsSpaceApi
			.get('api/events/upcoming')
			.then(response => {
				res(response.data);
			})
			.catch(e => rej(e));
	});
}