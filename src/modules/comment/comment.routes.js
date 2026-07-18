import { createComment , updateComment, findOrCreate, searchComments , newestComments, getCommentDetails } from "./comment.controller.js";
import { Router } from "express";

const commentRoutes = Router()

commentRoutes.post("/", createComment)

commentRoutes.patch("/:commentId", updateComment)

commentRoutes.post("/find-or-create", findOrCreate)

commentRoutes.get("/search", searchComments)

commentRoutes.get("/newest/:postId", newestComments)
commentRoutes.get("/details/:commentId", getCommentDetails)

export default commentRoutes