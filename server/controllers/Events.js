const Event = require('../models/Event');

exports.createNewEvent = async (req, res) => {
  const { title, participantsType, nrOfTeams, nrOfTeamPlayers, 
          type, location, startDateTime  } = req.body;
  const imgUrl = 'https://www.logolynx.com/images/logolynx/b5/b5e6c595e4c915f3ce0e3e7a50fa68d0.jpeg'; //req.body.imgUrl;
  const event = new Event({
    title,
    participantsType,
    nrOfTeams,
    nrOfTeamPlayers,
    type,
    location,
    startDateTime,
    imgUrl,
  });

  const result = await event.save();
  if (result) {
    return res.sendStatus(201);
  }
};

exports.getUpcomingEvents = async (req, res) => {
  const upcomingEvents = Event.find(
    { startDateTime: { $gt: new Date() } },
    (err, events) => {
      if (err) return res.status(500).send(err);
      return res.status(200).json(events);
    }
  );
  return upcomingEvents;
};