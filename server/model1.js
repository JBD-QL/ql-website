const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  team: {type: String, required: true},
  description: {type: String, required: true},
});

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;