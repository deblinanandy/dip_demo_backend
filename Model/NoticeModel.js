import mongoose from 'mongoose';

// Define Notice Schema
const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
       
    },
    description: {
        type: String,
        
    },
    imageUrl: {
        type: String // URL to the image file (e.g., stored in AWS S3)
    },
    videoUrl: {
        type: String // URL to the video file (e.g., stored in AWS S3)
    },
    pdfUrl: {
        type: String // URL to the PDF file (e.g., stored in AWS S3)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Notice Model
const Notice = mongoose.model('Notice', noticeSchema);

// Export Notice Model
export default Notice;
