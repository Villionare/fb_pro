import threadsModel from "../../Models/content/threads.js";

const handleUpdateThread = async (req, res) => {
    try {
        const { _id, name } = req.body;

        if (!_id || !name) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        const updatedThread = await threadsModel.findByIdAndUpdate(
            _id,
            { $set: { name } },
            { new: true, runValidators: true }
        );

        if (!updatedThread) {
            return res.status(404).json({ error: 'Thread not found' });
        }

        res.status(200).json({
            message: "Thread name updated",
            updatedThread
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error
        });
    }
}

export default handleUpdateThread;
