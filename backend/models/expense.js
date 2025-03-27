const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },  
    accountId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
    }, 
    amount: {
        type: Number, 
        required: true,
        min: [0, 'Amount must be positive']
    },
    category: {
        type: String, 
        required: true,
        trim: true
    },
    transactionType: {
        type: String, 
        enum: ["Cash", "Gpay", "PhonePay", "CreditCard"], 
        default: "Cash"
    },
    date: {
        type: Date, 
        default: () => Date.now(),
        // required: true
    },
    isRecurring: {
        type: Boolean, 
        default: false
    },
    recurringInterval:{
        type: Date,
        enum: ["Weekly", "Monthly", "Yearly"]
    },
    nextRecurringDate :{
        type: Date,
    },
    notes: { 
        type: String,
        // trim: true,
        // maxlength: [500, 'Notes cannot exceed 500 characters']
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Expense", ExpenseSchema);