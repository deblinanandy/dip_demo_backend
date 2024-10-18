import userRegistrationModel from '../Model/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define your JWT secret key here
const JWT_SECRET = 'your_jwt_secret_key_here';

const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Use 'email' instead of 'userId'

        // Find a user by email
        const user = await userRegistrationModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the entered password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Prepare the payload to be included in the JWT token
        const payload = {
            id: user._id,
            email: user.email, // Change 'userId' to 'email'
            role: user.role
        };

        // Generate JWT token using the defined secret key
        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the JWT token as a response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default AdminLogin;
