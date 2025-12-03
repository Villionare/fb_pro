const userCheck = (req, res) => {
    //this controller will be accessed by the frontend for every 1 mins 
    // so that fontend can provide features based upon the user type

    if (req.session.user) {
        res.status(200).json({
            success: true,
            message: 'Session Exists',
            session_data: req.session.user,
        })
    } else {
        res.status(200).json({
            message: "session dosen/'t exist",
            success: false
        })
    }
}

export default userCheck;