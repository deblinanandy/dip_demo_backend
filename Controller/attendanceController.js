import Attendance from '../Model/attendanceSchema.js'; // Adjust path as needed

export const createAttendance = async (req, res) => {
    try {
        const {
            name,
            designation,
            date,
            inTime,
            outTime,
            regularHours,
            overtimeHours,
            day,
            total,
            userId,
            officeMode,
            officeModeStartTime,
            officeModeEndTime,
        } = req.body;

        const newAttendance = new Attendance({
            name,
            designation,
            date,
            inTime,
            outTime,
            regularHours,
            overtimeHours,
            day,
            total,
            userId,
            officeMode,
            officeModeStartTime,
            officeModeEndTime,
        });

        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all attendance records
export const getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find();
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an attendance record by ID
export const getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAttendanceByUserId = async (req, res) => {
    try {
        // Extract userId from request parameters or query
        const { userId } = req.params; // or req.query if you prefer query parameters

        // Find attendance records by userId
        const attendances = await Attendance.find({ userId });

        // Check if records were found
        if (attendances.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this user.' });
        }

        // Return the attendance records
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an attendance record by ID
export const updateAttendanceById = async (req, res) => {
    try {
        // Find the existing attendance record
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        // Update only the fields that are present in the request body
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== null && req.body[key] !== undefined) {
                attendance[key] = req.body[key];
            }
        });

        // Save the updated record
        const updatedAttendance = await attendance.save();
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete an attendance record by ID
export const deleteAttendanceById = async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOfficeModeById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL params
        const { officeMode, officeModeStartTime, officeModeEndTime } = req.body; // Get the data from the request body

        // Find the attendance record by ID and update it
        const updatedAttendance = await Attendance.findByIdAndUpdate(
            id,
            { officeMode, officeModeStartTime, officeModeEndTime },
            { new: true } // Return the updated document
        );

        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
