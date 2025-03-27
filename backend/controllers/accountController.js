const Account = require("../models/account");

exports.addAccount = async (req, res) => {
    try {
        const { accountName, type, balance, isDefault, transaction } = req.body;

        const newAccount = new Account({
            userId: req.userId, // Assuming user ID is available from authentication middleware
            accountName,
            type,
            balance,
            isDefault,
            transaction
        });

        await newAccount.save();
        res.status(201).json({ message: "Account added successfully", account: newAccount });
    } catch (error) {
        console.error("Error adding account:", error);
        res.status(500).json({ error: "Failed to add account" });
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const { accountName, type, balance, isDefault, transaction } = req.body;
        const { id } = req.params;

        const updatedAccount = await Account.findByIdAndUpdate(
            id,
            { accountName, type, balance, isDefault, transaction },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ message: "Account updated successfully", account: updatedAccount });
    } catch (error) {
        console.error("Error updating account:", error);
        res.status(500).json({ error: "Failed to update account" });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAccount = await Account.findByIdAndDelete(id);

        if (!deletedAccount) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account" });
    }
};
