import adminModel from "../../../Models/users/admin.js"

const handleCreateNewAdmin = async (req, res) => {

    try {
        const { signUpName, signUpAge, signUpUsername, signUpEmail, signUptypePassword } = req.body || {};

        // 1 - check that we have got every required query in the url
        if (!signUpName || !signUpAge || !signUpUsername || !signUpEmail || !signUptypePassword) {
            return res.status(400).json({ message: 'server: fill the required fealds properly' });
        }

        // 2 - check if the username, email, or unique property already exists in the db
        const existingEmail = await adminModel.findOne({ email: signUpEmail });
        if (existingEmail) {
            return res.status(409).json({ message: "Email id already in use by another admin" });
        }

        const existingUsername = await adminModel.findOne({ username: signUpUsername });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already in use, find another unique one" });
        }

        const newUser = await adminModel.create({
            name: signUpName,
            username: signUpUsername,
            age: signUpAge,
            email: signUpEmail,
            password: signUptypePassword
        });

        const { password, ...userWithoutPassword } = newUser.toObject();

        //now that everything is okay we will create a session for the admin
        req.session.user = {
            type: 'admin',
            username: newUser.username,
            ip: req.ip
        }

        req.session.cookie.maxAge = 60 * 60 * 1000; // 1 hour in ms

        // Ensure session is saved before sending response so the Set-Cookie header is sent
        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ message: 'Failed to save session' });
            }

            //SO TO SEND THE REAL TIME EXPIRY OF THE SESSION WE WILL START WITH GETTING THE EXPIRY OF THE SESSION
            const maxAge = req.session.cookie.expires;

            res.status(201).json({
                message: "Admin SignUp Successfull",
                success: true,
                data: userWithoutPassword,
                session_data: req.session.user,
                session_expiry: maxAge.toISOString(),
            });
        });


    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }
}


//cookies
//caches
//sessions
//tokens

export default handleCreateNewAdmin