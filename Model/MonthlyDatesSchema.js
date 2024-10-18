import mongoose from 'mongoose';

const MonthlyDatesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true,
    },
    ContactNo: {
        type: String,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    constantDates: {
        type: [Date],
        required: true,
    },
});

// Create a virtual property for the monthYear field (e.g., "5-2024" for May 2024)
MonthlyDatesSchema.virtual('monthYear').get(function () {
    return `${this.month}-${this.year}`;
});

// Static method to update constant dates for the current month and year
MonthlyDatesSchema.statics.updateCurrentMonthConstantDates = async function (name, userId, Designation, ContactNo) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based (0 = January, 11 = December)
    const currentYear = currentDate.getFullYear();

    // Calculate the constant dates for the current month (e.g., first, fifteenth, and last day of the month)
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1); // Setting day to 1 gives the first day of the month
    const fifteenthDayOfMonth = new Date(currentYear, currentMonth - 1, 15);
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0); // Setting day to 0 gives the last day of the previous month

    const constantDates = [firstDayOfMonth, fifteenthDayOfMonth, lastDayOfMonth];

    // Update or create a new record for the current month and year
    const existingRecord = await this.findOne({ name, userId, Designation, ContactNo, month: currentMonth, year: currentYear });

    if (existingRecord) {
        // Update existing record with new constant dates
        existingRecord.constantDates = constantDates;
        await existingRecord.save();
        return existingRecord;
    } else {
        // Create new record for the current month and year
        const newRecord = new this({ name, userId, Designation, ContactNo, month: currentMonth, year: currentYear, constantDates });
        await newRecord.save();
        return newRecord;
    }
};

const MonthlyDates = mongoose.model('MonthlyDates', MonthlyDatesSchema);

export default MonthlyDates;
