import jwt from 'jsonwebtoken';

// Define your JWT secret key directly in the file
const JWT_SECRET = 'your_jwt_secret_key_here';

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const tokenWithoutBearer = token.split(' ')[1]; // Remove "Bearer " from the token
        const verified = jwt.verify(tokenWithoutBearer, JWT_SECRET); // Use the direct secret
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

export default verifyToken; // Export the middleware for use in other files
