import mongoose from "mongoose";

const TimeRecordSchema = new mongoose.Schema(
    {
        inTimes: { type: Date },
        day: { type: String },
        outTimes: { type: Date },
        totals: { type: Number },
        overtimes: { type: Number },
        weekNames: { type: String }
    },
    { versionKey: false }
);

export const TimeRecord = mongoose.model("TimeRecord", TimeRecordSchema);
