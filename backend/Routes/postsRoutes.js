import express from "express";
import allowAnonymousOrAdmin from "../Middlewares/eitherAnonORAdmin.js";
import handleListPost from "../Controllers/op_posts/handleListPost.js";
import getOpReplies from "../Controllers/replies/getOpReplies.js";
import getreplyReplies from "../Controllers/replies/getReplyReplies.js";

const postsRouter = express.Router({ mergeParams: true });

//get post through id
postsRouter.get('/', allowAnonymousOrAdmin, handleListPost);

//fetching replies.
postsRouter.get('/replies', allowAnonymousOrAdmin, getOpReplies)

postsRouter.get('/replyReplies', allowAnonymousOrAdmin, getreplyReplies);

export default postsRouter;