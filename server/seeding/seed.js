const seeder = require('mongoose-seed');
require('dotenv').config();
const CONSTANTS = require('../constants');
const participantsTypesData = require('./data/participantTypes');
const eventTypesData = require('./data/eventTypes');

const seedData = [participantsTypesData, eventTypesData];
const loadModels = ['models/participantType.model', 'models/eventType.model', 'models/invitationStatus.model'];
const clearModels = ['ParticipantType', 'EventType', 'InvitationStatus'];

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
