import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for attendance records
const attendanceSchema = new Schema({
    name: {
        type: String,
    },
    designation: {
        type: String,
    },
    date: {
        type: String,
    },
    inTime: {
        type: String,
    },
    outTime: {
        type: String,
    },
    regularHours: {
        type: Number,
    },
    overtimeHours: {
        type: Number,
    },
    day: {
        type: String,
    },
    total: {
        type: String,
    },
    userId: {
        type: String,
    },
    officeMode: {
        type: String,
        // Added officeMode with enum values if needed
    },
    officeModeStartTime: {
        type: String,  // or use Date if you want to store it as a Date object
    },
    officeModeEndTime: {
        type: String,  // or use Date if you want to store it as a Date object
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
