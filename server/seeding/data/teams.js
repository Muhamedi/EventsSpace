var mongoose = require('mongoose');

const teams = {
    model: 'Team',
    documents: [
      {
        _id: mongoose.Types.ObjectId('5cabe64dcf0d4447fa60f5e2'),
        name: 'White',
        isActive: true
      },
      {
        _id: mongoose.Types.ObjectId('5cabe64dcf0d4447fa60f5e3'),
        name: 'Black',
        isActive: true
      },
    ],
  };
  
  module.exports = teams;
  