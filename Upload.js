import multer from 'multer';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
    destination: './public/image', // Folder where files will be stored
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;
