const anonLogout = async (req, res) => {
    try {
        req.session.user = null;
        req.session.logoutTime = new Date().toISOString();

        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) reject(err);
                else resolve(null);
            });
        });

        res.clearCookie('user.sid');
        res.json({
            message: 'Goodbye Anonymous-Chan',
            success: true,
            logouted: true
        });

    } catch (err) {
        res.status(500).json({
            message: 'Error Logging out',
            success: false,
            logouted: false
        });
    }
};

export default anonLogout;