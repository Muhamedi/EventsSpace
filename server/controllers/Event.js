const Event = require("../models/Event");

exports.createNewEvent = async (req, res) => {

  console.log("Req:", req.body);

  const title = req.body.title;
  const text = req.body.text;
  const type = req.body.type;
  const location = req.body.location;
  const startDateTime = req.body.startDateTime;
  const imgUrl = req.body.imgUrl;

  const event = new Event({
    title,
    text,
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

  const upcomingEvents = Event.find({startDateTime: {$gt: new Date()}}, (err, events) => {
      if(err)
      return res.status(500).send(err);

      return res.status(200).json(events);
  });

  return upcomingEvents;
};
