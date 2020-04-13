const Event = require("../models/Event");

exports.createNewEvent = async (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  const type = req.body.type;
  const location = req.body.location;
  const imgUrl = req.body.imgUrl;
  const dateCreated = new Date();
    console.log("HAAAAAAAAAAAAAAAAA:",req);
  const event = new Event({
    title,
    text,
    type,
    location,
    imgUrl,
    dateCreated,
  });

  const result = await event.save();

  if (result) {
    res.redirect("/");
  }

};
