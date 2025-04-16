import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        name : {
            type : String,
            default : ""
        },
        lastName : {
            type : String,
            default: ""
        },
        detail: {
            type: String,
            default : ""
        },
        email: {
            type: String,
            default : ""
        },
        contact: {
            type: String,
            default : ""
        },
        address: {
            type: String,
            default: ""
        },
        status : {
            type: String,
            default : "pending"
        }
    },
    { timestamps: true }
)

delete mongoose.connection.models['Post']
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;