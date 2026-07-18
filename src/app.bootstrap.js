import express from "express"
import { connectionDB, syncDB, sequelize } from "./DB/db.js"
import "./DB/association.js"
import { logger } from "./Middleware/logger.js"
import router from "./modules/post/post.routes.js"
import postRoutes from "./modules/post/post.routes.js"
import userRoutes from "./modules/user/user.routes.js"
import commentRoutes from "./modules/comment/comment.routes.js"
const port = 3000

const app = express()

const bootstrap = async function(){

    await connectionDB()
    await syncDB()
    app.use(express.json())
    app.use(logger)

    app.use("/posts", postRoutes)

    app.use("/users", userRoutes)

    app.use("/comments", commentRoutes)


    app.listen(port, () => console.log(`Server is running on port ${port}`))
}

export default bootstrap