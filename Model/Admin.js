import mongoose from "mongoose";

export const AdminSchema = new mongoose.Schema({

    password: {
        type: String,
        required: [true, "Please enter your password"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
 
    

    role: {
        type: String,
        default: "admin", // Default value is "user"
    },
});



export default mongoose.model("Ad", AdminSchema);
