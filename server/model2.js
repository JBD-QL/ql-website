const mongoose = require('mongoose');
// const uri = process.env.MONGO_URI || 'mongodb://localhost/QLprojects1';

// const db = mongoose.connect(uri);

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {type: String, required: true},
  stack: {type: Array},
  size: {type: Number},
});

const companyModel = mongoose.model('companies', companySchema);

module.exports = companyModel;