import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './Router.js';
import Database from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from 'public/image' directory
const publicImagePath = join(__dirname, 'public/image');
app.use('/public/image', express.static(publicImagePath));

// Initialize Database (assuming this is a valid operation)
Database();

// Routes
app.use('/api', router);

// Start the server
app.listen(port, () => {
    console.log('Connected to port ' + port);
});
