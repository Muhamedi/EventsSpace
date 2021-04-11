const seeder = require('mongoose-seed');
require('dotenv').config();
const CONSTANTS = require('../constants');
const participantsTypesData = require('./data/participantTypes');
const eventTypesData = require('./data/eventTypes');
const invitationStatusesData = require('./data/invitationStatuses');
const participantStatusesData = require('./data/participantStatuses');
const teamsData = require('./data/teams');

const seedData = [participantsTypesData, eventTypesData, invitationStatusesData, 
                  participantStatusesData, teamsData];
const loadModels = ['models/participantType.model', 'models/eventType.model', 'models/invitationStatus.model', 
                    'models/participantStatus.model', 'models/team.model'];
const clearModels = ['ParticipantType', 'EventType', 'InvitationStatus', 
                     'ParticipantStatus', 'Team'];

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
