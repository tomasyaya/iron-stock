const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: String,
    symbolName: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;