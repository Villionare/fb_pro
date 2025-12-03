import express from "express";
import handleCreateAnonymous from "../Controllers/Users/anonymous/handleCreateAnonymous.js";
import anonLogout from "../Controllers/Users/anonymous/anonLogout.js";
import anonymousCheck from "../Middlewares/anonCheck.js";
const anonymousRouter = express.Router();

anonymousRouter.post("/create", handleCreateAnonymous);
anonymousRouter.post("/anon_logout", anonymousCheck, anonLogout);

export default anonymousRouter;
