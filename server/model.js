const mongoose = require('mongoose');
const uri = process.env.MONGO_URI || 'mongodb://localhost/QLprojects';

const db = mongoose.connect(uri);

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  company: {type: String, required: true},
  size: {type: Number},
  description: {type: String, required: true},
  stack: {type: Array}
});

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;