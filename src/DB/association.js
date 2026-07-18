import userModel from "./models/users.models.js";
import Post from "./models/posts.models.js";
import Comment from "./models/comments.models.js";

userModel.hasMany(Post, {
    foreignKey: "userId",
});

Post.belongsTo(userModel, {
    foreignKey: "userId",
});

Post.hasMany(Comment, {
    foreignKey: "postId",
});

Comment.belongsTo(Post, {
    foreignKey: "postId",
});

userModel.hasMany(Comment, {
    foreignKey: "userId",
});

Comment.belongsTo(userModel, {
    foreignKey: "userId",
});