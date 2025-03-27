const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    accountName: {type: String},
    type: {type: String, enum: ["Saving", "Current"]},
    transaction : {type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required:true}
});

module.exports = mongoose.model("Account", accountSchema);