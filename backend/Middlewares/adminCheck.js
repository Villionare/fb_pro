const adminCheck = (req, res, next) => {
    if (!req.session.user || req?.session?.user?.type !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to access this page",
            authorized: false
        });
    }

    console.log('admin middleware check passed');
    next();
};

export default adminCheck;