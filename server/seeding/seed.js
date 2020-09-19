const seeder = require('mongoose-seed');
require('dotenv').config();
const CONSTANTS = require('../constants');
const participantsTypesData = require('./data/participantTypes');

const seedData = [participantsTypesData];
const loadModels = ['models/participantType.model'];
const clearModels = ['ParticipantType'];

seeder.connect(
  CONSTANTS.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    seeder.loadModels(loadModels);
    seeder.clearModels(clearModels, () => {
      seeder.populateModels(seedData, () => {
        seeder.disconnect();
      });
    });
  }
);
