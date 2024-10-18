import mongoose from "mongoose";

const UserTimeSchema = new mongoose.Schema(
    {
        inTimes: [{ type: Date }],
        day: [{ type: String }],
        outTimes: [{ type: Date }],
        totals: [{ type: Number }],
        overtimes: [{ type: Number }],
        weekNames: [{ type: String }],
    },
    { versionKey: false }
);

export default mongoose.model("UserTime", UserTimeSchema);
