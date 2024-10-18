import userRegistrationModel from '../Model/User.js';
import bcrypt from 'bcrypt';

// Create a new user
const createUser = async (req, res) => {
    try {
        const {
            userId,
            name,
            password,
            email,
            Designation,
            DOB,
            BloodGroup,
            Address,
            AdharNO,
            ContactNo,
            EmergencyMobileNo,
            company,        // Keep company field
            startTime,      // Include start time
            endTime,        // Include end time
            Regular_Hours   // New field Regular_Hours
        } = req.body;

        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user data object including the provided fields
        const userData = {
            userId,
            name,
            password: hashPassword,
            email,
            Designation,
            DOB,
            BloodGroup,
            Address,
            AdharNO,
            ContactNo,
            EmergencyMobileNo,
            company,        // Include company
            role: 'user',   // Assign default role to new user
            startTime,      // Include start time
            endTime,        // Include end time
            Regular_Hours   // Include Regular_Hours
        };

        // Create new user in the database
        const newUser = await userRegistrationModel.create(userData);

        return res.status(201).json({
            success: true,
            message: 'User account created successfully',
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Update user times and Regular_Hours by userId
const updateUserTimes = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from route parameters
        const { inTimes, outTimes, totals, overtimes, days, weekNames, startTime, endTime, Regular_Hours } = req.body;

        // Validate the input
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        // Validate the arrays
        if (!days || days.length !== inTimes.length || !weekNames || weekNames.length !== inTimes.length) {
            return res.status(400).json({
                success: false,
                message: 'Days and weekNames arrays must be provided and must match the length of inTimes'
            });
        }

        // Find the user by userId and update the time-related fields
        const updatedUser = await userRegistrationModel.findOneAndUpdate(
            { userId }, // Query to find the user by userId
            {
                $push: {              // Use $push to append to arrays
                    inTimes: { $each: inTimes },
                    outTimes: { $each: outTimes },
                    totals: { $each: totals },
                    overtimes: { $each: overtimes },
                    days: { $each: days },
                    weekNames: { $each: weekNames } // Include weekNames in the update
                },
                $set: {                // Use $set to update individual fields
                    startTime,
                    endTime,
                    Regular_Hours   // Update Regular_Hours
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User times updated successfully',
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Update user office mode and description by userId, including Regular_Hours
const updateUserOById = async (req, res) => {
    try {
        const { userId } = req.params;
        const { officeMode, description, Regular_Hours } = req.body;

        // Update user data in the database
        const updatedUser = await userRegistrationModel.findOneAndUpdate(
            { userId },
            {
                officeMode,
                description,
                Regular_Hours   // Include Regular_Hours in the update
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userRegistrationModel.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Get user by userId
const getUserById = async (req, res) => {
    try {
        const user = await userRegistrationModel.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Update user by userId, including Regular_Hours
const updateUserById = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        if (req.body.Regular_Hours) {
            updateData.Regular_Hours = req.body.Regular_Hours;
        }

        const updatedUser = await userRegistrationModel.findOneAndUpdate(
            { userId: req.params.userId },
            updateData,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Delete user by userId
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await userRegistrationModel.findOneAndDelete({ userId: req.params.userId });
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Delete all users
const deleteAllUsers = async (req, res) => {
    try {
        await userRegistrationModel.deleteMany();
        res.status(200).json({ success: true, message: 'All users deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

export {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteAllUsers,
    updateUserOById,
    updateUserTimes
};
