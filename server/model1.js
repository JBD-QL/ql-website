const mongoose = require('mongoose');
// const uri = process.env.MONGO_URI || 'mongodb://localhost/QLprojects1';

// const db = mongoose.connect(uri);

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  company: {type: String, required: true},
  description: {type: String, required: true},
});

const projectModel = mongoose.model('projects', projectSchema);

module.exports = projectModel;