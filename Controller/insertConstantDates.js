import MonthlyDates from '../Model/MonthlyDatesSchema.js'; // Import your Mongoose model

// Controller function to insert or update constant dates for the current month and year
const insertConstantDates = async (name, userId, Designation, ContactNo) => {
    try {
        // Call the static method to update constant dates for the current month and year
        const updatedRecord = await MonthlyDates.updateCurrentMonthConstantDates(name, userId, Designation, ContactNo);

        return {
            success: true,
            message: `Constant dates updated for ${updatedRecord.monthYear}`,
            constantDates: updatedRecord.constantDates,
        };
    } catch (error) {
        throw new Error(`Error inserting/updating constant dates: ${error.message}`);
    }
};

export default insertConstantDates;
