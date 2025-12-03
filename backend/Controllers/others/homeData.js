import boardCategoryModel from "../../Models/content/boardCategories.js";
import boardsItemsModel from "../../Models/content/boards.js";
import threadsModel from "../../Models/content/threads.js";
import adminModel from "../../Models/users/admin.js";
import anonymousModel from "../../Models/users/anonymous.js";

const homeData = async (req, res) => {

    //ip address
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.socket.remoteAddress;

    //total admins
    const total_admin = await adminModel.countDocuments();

    //total anonymous
    const total_anonymous = await anonymousModel.countDocuments();

    //total users
    const total_users = total_admin + total_anonymous;

    //active users 
    const active_users = 1;

    //total categories
    const total_categories = await boardCategoryModel.countDocuments();

    //total boards
    const total_boards = await boardsItemsModel.countDocuments();

    //total threads
    const total_threads = await threadsModel.countDocuments();

    res.json({
        ip,
        total_admin,
        total_anonymous,
        total_users,
        active_users,
        total_categories,
        total_boards,
        total_threads
    });
}

export default homeData;