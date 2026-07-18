import Post from "../../DB/models/posts.models.js";
import Comment from "../../DB/models/comments.models.js";
import userModel from "../../DB/models/users.models.js";
import { col , fn } from "sequelize";

export const CreatePost = async (req,res) => {
    try {
        const post = new Post(req.body)
        await post.save()
        return res.status(201).json({message:"Post created successfully", post})
    } catch (error) {
        return res.status(500).json(error.message)
    }
} 

export const deletePost = async (req,res) => {
    try {
        const { postId } = req.params
        const { userId } = req.body
        const post = await Post.findByPk(postId)

        if(!post){
            return res.status(404).json("Post not found.")
        }
        if(post.userId !== userId){
            return res.status(403).json("You are not allowed to delete this post.")
        }

        await post.destroy()

        return res.status(200).json("Post deleted")
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const details = async (req,res) => {
    try{
        const posts = await Post.findAll(
            {
                attributes: ["id", "title"],
                include:[
                    {
                        model:userModel,
                        attributes:["id", "name"]
                    },
                    {
                        model:Comment,
                        attributes:["id", "content"]
                    }
                ]

            }
        )
        return res.status(200).json(posts)
    
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}

export const commentCount = async (req,res) => {
    try {
        const posts = await Post.findAll(
            {
                attributes: [
                    "id",
                    "title",
                    [fn("COUNT", col("Comments.id")), "commentCount"]
                ],
                include:[
                    {
                        model:Comment,
                        attributes: [],
                    },
                ],
                group: ["Post.id"]
            }
        )
        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json(error.message)

    }
}