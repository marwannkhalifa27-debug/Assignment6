import { Router } from "express";
import { CreatePost , deletePost, details, commentCount } from "./post.controller.js";

const postRoutes = Router()

postRoutes.post("/", CreatePost)

postRoutes.delete("/:postId", deletePost)

postRoutes.get("/details", details)

postRoutes.get("/comment-count", commentCount)

export default postRoutes