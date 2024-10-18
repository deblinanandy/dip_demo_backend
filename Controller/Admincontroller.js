import adminModel from '../Model/Admin.js';
import bcrypt from 'bcrypt';

const AdminController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await adminModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Email is already existing',
            });
        }

        const defaultRole = 'admin';
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Assuming you are using multer for file uploads
        const userData = {
            email: email,
            password: hashPassword,
            image: req.file ? req.file.path : null, // Store the path to the image file
            role: defaultRole,
        };

        console.log(userData);

        await adminModel.create(userData);

        return res.status(200).send({
            success: true,
            message: 'User account created successfully',
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error: " + error.message,
        });
    }
};

// Get all admin users
const getAllAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find({ role: 'admin' });

        return res.status(200).send({
            success: true,
            admins,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error: " + error.message,
        });
    }
};

export { AdminController, getAllAdmins };
