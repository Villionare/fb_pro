import express from "express";
import handleGetAllThreads from "../Controllers/threads/handleGetAllThreads.js";
import handleSeeThread from "../Controllers/threads/handleSeeThread.js";
import handleCreateThread from "../Controllers/threads/handleCreateThread.js";
import allowAnonymousOrAdmin from "../Middlewares/eitherAnonORAdmin.js";
import handleReplyOP from "../Controllers/op_posts/handleReplyToOP.js";
import handleReplyToReply from "../Controllers/op_posts/handleReplyToReply.js";
// mergeParams:true allows this router to access params from parent mount path
const threadRouter = express.Router({ mergeParams: true });

//threads
threadRouter.get('/', allowAnonymousOrAdmin, handleGetAllThreads); //getting all the threads
threadRouter.get('/:thread_id', allowAnonymousOrAdmin, handleSeeThread); //showing one thread
threadRouter.post('/:thread_id/replytoreply', allowAnonymousOrAdmin, handleReplyToReply); //showing one thread
threadRouter.post('/:thread_id/replytoop', allowAnonymousOrAdmin, handleReplyOP); //showing one thread
threadRouter.post('/create_thread', allowAnonymousOrAdmin, handleCreateThread); //Creating a OP post (thread)

export default threadRouter;