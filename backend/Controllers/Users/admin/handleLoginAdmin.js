import adminModel from '../../../Models/users/admin.js';

const handleLoginAdmin = async (req, res) => {
    const { loginIdentifier, loginPassword } = req.body || {};

    try {
        // check required fields
        if (!loginIdentifier || !loginPassword) {
            return res.status(400).json({ message: "server: Fill the fealds properly" });
        }

        // Find user by either username or email
        const user = await adminModel.findOne({
            $or: [{ username: loginIdentifier }, { email: loginIdentifier }]
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check password (TODO: replace with bcrypt compare)
        if (user.password !== loginPassword) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const { password, ...restWithoutPassword } = user.toObject();

        // create a session for the user
        req.session.user = {
            type: 'admin',
            username: user.username,
            ip: req.ip
        };

        // SET MAXAGE ONLY IF NOT ALREADY SET
        if (!req.session.cookie.maxAge) {
            req.session.cookie.maxAge = 60 * 60 * 1000; // 1 hour
            // req.session.cookie.maxAge = 60 * 1000; // 1 min
        }
        // req.session.store.ttl = 60 * 60 //setting the (TTL) time to live 1hrs for the admin after that the session will be destroyed from the server

        //now we will get the left time in session expiry to send to the frontend.

        // console.log(req.session.cookie.maxAge);
        // console.log("max age: ", maxAge);

        // Ensure session is saved before sending response so Set-Cookie is sent


        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Failed to save session' });
            }

            //SO TO SEND THE REAL TIME EXPIRY OF THE SESSION WE WILL START WITH GETTING THE EXPIRY OF THE SESSION
            const maxAge = req.session.cookie._expires;

            return res.status(200).json({
                message: "Admin login Successful",
                success: true,
                data: restWithoutPassword,
                session_data: req.session.user,
                session_expiry: maxAge.toISOString(),
            });
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default handleLoginAdmin;