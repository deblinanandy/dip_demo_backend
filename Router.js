import Router from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    deleteAllUsers,
    updateUserOById,
    updateUserTimes
} from "./Controller/Usercontroller.js";
import { userLogin, userLogout } from "./Controller/userLogin.js";
import verifyToken from './Controller/verifyToken.js';
import { AdminController, getAllAdmins } from "./Controller/Admincontroller.js";
import Adminloging from "./Controller/Adminloging.js";
import {
    createAttendance,
    getAllAttendances,
    getAttendanceById,
    updateAttendanceById,
    deleteAttendanceById,
    getAttendanceByUserId,
    updateOfficeModeById

} from "./Controller/attendanceController.js";

import {
    createNotice,
    getAllNotices,
    getNoticeById,
    updateNotice,
    deleteNotice
} from './Controller/createNotice.js'

import insertConstantDates from "./Controller/insertConstantDates.js";
const router = Router();
router.get('/', (req, res) => {
    res.send(`<h3>Login app routing</h3>`);

})
router.post('/users', createUser);
router.get('/users',getAllUsers);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUserById);
router.put('/user/:userId', updateUserOById);
router.delete('/users/:userId', deleteUserById);
router.delete('/users', deleteAllUsers);

router.post('/login', userLogin);
router.post('/logout/:userId', userLogout);
router.post('/admin', AdminController);

router.get('/admin/all', getAllAdmins);
router.post('/adminlogin', Adminloging);

router.put('/update-user-times/:userId', updateUserTimes);

// Route for creating a new attendance record
router.post('/atte', createAttendance);
router.put('/attendanceupdate/:id', updateOfficeModeById);
// Route to get all attendance records
router.get('/attteee', getAllAttendances);

// Route to get a specific attendance record by ID
router.get('/findbyId/:id', getAttendanceById);
router.get('/findbyuserId/:userId', getAttendanceByUserId);
// Route to update a specific attendance record by ID
router.put('/up/:id', updateAttendanceById);

// Route to delete a specific attendance record by ID
router.delete('/attendencedelete/:id', deleteAttendanceById);
router.post('/notice', createNotice);

// Route to get all notices
router.get('/notice', getAllNotices);

// Route to get a single notice by ID
router.get('/notice/:id', getNoticeById);

// Route to update a notice by ID
router.put('/notice/:id', updateNotice);

// Route to delete a notice by ID
router.delete('/notice/:id', deleteNotice);
export default router;