import threadsModel from "../../Models/content/threads.js";

const handleSeeThread = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const thread = await threadsModel.findOne({ _id });

        if (!thread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        res.status(200).json({
            message: "success",
            thread
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
}

export default handleSeeThread