import userRegistrationModel from '../Model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Define your JWT secret key here
const JWT_SECRET = 'your_jwt_secret_key_here';

const userLogin = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // Find the user by userId
    const user = await userRegistrationModel.findOne({ userId });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid userId or password'
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid userId or password'
      });
    }

    // Define the payload with additional fields
    const payload = {
      id: user._id,
      userId: user.userId,
      name: user.name,
      designation: user.Designation,
      contactNo: user.ContactNo,
      role: user.role,
      
    };

    // Generate a JWT token with the additional payload
    const token = jwt.sign(
      payload, // Pass the payload with additional fields
      JWT_SECRET, // Use the hardcoded secret key
      { expiresIn: '1h' } // Token expiration time
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

const userLogout = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL parameters

    // Find the user by userId
    const user = await userRegistrationModel.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's logoutTimestamp and logoutLogging array
    user.logoutTimestamp = new Date();
    user.logoutLogging.push(user.logoutTimestamp); // Append logout timestamp to logoutLogging array
    await user.save();

    // Log the logout details to the terminal
    console.log(`User ${userId} has logged out.`);
    console.log('Logout Timestamp:', user.logoutTimestamp);
    console.log('Logout Logging:', user.logoutLogging);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};






export { userLogin, userLogout };
