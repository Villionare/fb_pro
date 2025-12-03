import express from "express";
import handleCreateNewAdmin from "../Controllers/Users/admin/handleCreateNewAdmin.js";
import handleLogoutAdmin from "../Controllers/Users/admin/handleLogoutAdmin.js";
import adminCheck from "../Middlewares/adminCheck.js";
import handleLoginAdmin from "../Controllers/Users/admin/handleLoginAdmin.js";
const adminRoutes = express.Router();


//admin login
adminRoutes.post('/admin_login', handleLoginAdmin);
//{
// "message": "login Successfull",
// "data": restWithoutPassword,
// "session_data": req.session.user,
// }

adminRoutes.post('/admin_signup', handleCreateNewAdmin);
// {
//     "message": "Admin SIgnUp Successfull",
//     "data": userWithoutPassword,
//     "session_data": req.session.user,
// }

adminRoutes.post('/admin_logout', adminCheck, handleLogoutAdmin);
// {
//     message: 'Logged out successfully ',
//     data: true
// }

adminRoutes.get('/dashboard', adminCheck, (req, res) => {
    res.json({ "message": "this is the admin dashboard" })
});

export default adminRoutes;