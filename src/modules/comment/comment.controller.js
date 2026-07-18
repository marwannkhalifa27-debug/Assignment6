import Comment from "../../DB/models/comments.models.js";
import userModel from "../../DB/models/users.models.js";
import Post from "../../DB/models/posts.models.js";

import { Op } from "sequelize";


export const createComment = async (req,res,next) => {
    try{
        const comments = await Comment.bulkCreate(req.body)
        return res.status(201).json({message:"comments created", comments})
    }
    catch(error){
        return res.status(500).json(error.message)
    }
}

export const updateComment = async (req,res,next) => {
    try {
        const { commentId } = req.params
        const { userId, content } = req.body

        const comment = await Comment.findByPk(commentId)

        if(!comment){
            return res.status(404).json("comment not found.")
        }

        if(comment.userId !== userId){
            return res.status(403).json("You are not authorized to update this comment.")
        }

        comment.content = content
        await comment.save({ validate:false })

        return res.status(200).json({message:"Comment updated."})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const findOrCreate = async (req,res,next) => {
    try {
        const { content , userId , postId } = req.body
        const [comment, created] = await Comment.findOrCreate(
            {
                where:{
                    content,
                    userId,
                    postId,
                },
                defaults:{
                    content,
                    userId,
                    postId,
                },
            }
        )
        return res.status(200).json({
            message: created
            ? "Comment created succussfully"
            : "Comment already exists",
            comment
        })
    } catch (error) {
        return res.status(500).json(error.message)
    }    
}

export const searchComments = async (req, res) => {
    try {
        const { word } = req.query;

        const comments = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`,
                },
            },
        });

        return res.status(200).json(comments);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const newestComments = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.findAll({
            where: {
                postId,
            },
            order: [["createdAt", "DESC"]],
            limit: 3,
        });

        return res.status(200).json(comments);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getCommentDetails = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.findByPk(commentId, {
            include: [
                {
                    model: userModel,
                    attributes: ["id", "name"],
                },
                {
                    model: Post,
                    attributes: ["id", "title"],
                },
            ],
        });

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
            });
        }

        return res.status(200).json(comment);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};