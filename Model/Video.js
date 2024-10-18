import mongoose from "mongoose";

const Video = new mongoose.Schema(
    {
        video: {
            type: String,
            required: true,
        },
       
    },
    { versionKey: false }
);

export default mongoose.model("Video", Video);
