import op_postModel from "../../Models/content/op_posts.js";

const getOpReplies = async (req, res) => {
    //for now we will get the _id of the op doc. and then we will search for replies in it.
    const { _id } = req.query;

    if (!_id) {
        res.status(400).json({
            message: "messing required fealds"
        })
    }

    const checkOP = await op_postModel.findById({ _id }).populate('replies');

    const repliesArray = checkOP.replies;

    if (!checkOP) {
        res.status(400).send({
            message: "op does not exists"
        })
    }

    res.status(200).json({
        repliesArray
    })
}

export default getOpReplies;