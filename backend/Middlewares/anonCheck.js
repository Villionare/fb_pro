const anonymousCheck = (req, res, next) => {
    console.log(req.session);

    if (req.session.user && req.session.user.type === "anonymous") {
        console.log("anonymous middleware check pass");
        return next();
    }

    // FAIL: User is not anonymous or not logged in
    return res.status(403).json({
        session_recieved: req.session,
        message: "You are not authorized to access this page",
        authorized: false
    });
}

export default anonymousCheck