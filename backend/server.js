import http from "http";
import express from "express";
import dotenv from "dotenv";
import threadRouter from "./Routes/threadRoutes.js";
import boardsRoutes from "./Routes/boardsRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import { mongoConnect } from "./Controllers/others/mongoConnect.js";
import cors from "cors";
import anonymousRouter from "./Routes/anonymousRoutes.js";
import test from "./Controllers/others/test.js";
import userCheck from "./Controllers/Users/userCheck.js";
import homeData from "./Controllers/others/homeData.js";
import allowAnonymousOrAdmin from "./Middlewares/eitherAnonORAdmin.js";
import send_DBData from "./Controllers/others/send_DBData.js";
import postsRouter from "./Routes/postsRoutes.js";
import session from "express-session";
import socketMainServer from "./sockets/index.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5555;

// Allow CORS from the frontend and allow credentials (cookies) to be sent.
// Replace the origin below with your frontend origin in production.
app.use(cors({
    origin: 'https://fb-pro-front-p807t5c74-duedulls-projects.vercel.app/',
    credentials: true, //only this way cookies can be recieved
}));

app.set("view engine", "ejs");
app.set('trust proxy', true); //this is used to get the ip of client
app.use(express.json());
app.use(express.static('./public'));

//CONNECT DB 
const store = await mongoConnect(process.env.MONGO_CONNECT);

//SESSIONS
app.use(session({
    store,
    rolling: false,
    name: "user.sid",
    secret: process.env.SESSION_SECURITY_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true, // Prevents client-side JS access for security
        sameSite: 'lax', // Protects against CSRF
    }
})); //this session is created globally for any route

//ROUTES
app.get('/test', test);
app.get('/api/home_data', homeData);

//sending board categories and boards.
app.get('/api/data', allowAnonymousOrAdmin, send_DBData);

//frontend access to user type
app.get('/api/me', userCheck);

//admin
app.use('/api/admin', adminRoutes);

//anonymous
app.use('/api/anonymous', anonymousRouter);

//boards
app.use('/api/boards', boardsRoutes);

//threads
app.use('/api/boards/:slug/threads', threadRouter);

//for fetching the post and sending to the frontend + replies.
app.use('/api/post', postsRouter);

const serverMain = http.createServer(app);

//NOW SOCKET CODE:
socketMainServer(serverMain);

serverMain.listen(port, () => {
    console.log(`🛜 ` + ` Server listening on port ${port}!!!`)

});