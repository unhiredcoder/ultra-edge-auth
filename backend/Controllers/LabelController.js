const LabelCode = require("../Models/LabelCode");
const UserModel = require("../Models/User");


exports.verifyLabel = async (req, res) => {
    try {
        const { code } = req.body;
        const userId = req.user._id;  // Assuming JWT middleware populates req.user

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const MAX_ATTEMPTS = 3;

        if (user.attempts >= MAX_ATTEMPTS) {
            return res.status(403).json({ message: 'Too many failed attempts. Access blocked.' });
        }

        const label = await LabelCode.findOne({ code:code.toLowerCase() });

        if (!label || label.used) {
            user.attempts += 1;
            await user.save();

            const remainingAttempts = MAX_ATTEMPTS - user.attempts;
            return res.status(400).json({ 
                message: `Invalid or already used code. Attempts left: ${remainingAttempts > 0 ? remainingAttempts : 0}` 
            });
        }

        // Mark label code as used and assign it to the user
        label.used = true;
        await label.save();
        // Reset user attempts on success
        user.attempts = 0;
        await user.save();
        return res.status(200).json({ success: true, message: 'Label code verified successfully.' });
    } catch (error) {
        console.error("Error verifying label:", error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};
