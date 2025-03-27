const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    accountName: {type: String},
    type: {type: String, enum: ["Saving", "Current"]},
    balance: {type: Number},
    isDefault: {type: Boolean},
    transaction : {type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required:true}
},{
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Account", accountSchema);