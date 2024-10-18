import mongoose from "mongoose";

const UserRegistrationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        company: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        Designation: {
            type: String,
            required: true,
        },
        DOB: {
            type: String,
            required: true,
        },
        BloodGroup: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        AdharNO: {
            type: Number,
            required: true,
            unique: true,
        },
        ContactNo: {
            type: Number,
            required: true,
            unique: true,
        },
        Regular_Hours: {
            type: Number,
            required: true,
            unique: true,
        },
        EmergencyMobileNo: {
            type: Number,
            required: true,
        },
        timestamp: { type: Date, default: Date.now },
        loginTimestamp: { type: Date },
        logging: [{ type: Date }],
        role: {
            type: String,
            default: "user",
        },
         
        description: {
            type: String,
        },
        logoutTimestamp: { type: Date },
        logoutLogging: [{ type: Date }],
        startTime: { type: String },   // Add startTime field
        endTime: { type: String }, 
    },
    { versionKey: false }
);

export default mongoose.model("Us", UserRegistrationSchema);
