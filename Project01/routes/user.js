const express = require("express");
const {
    handleGetAllUser,
    handleInsertAUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.route("/users")
    .get(handleGetAllUser)
    .post(handleInsertAUser);

userRouter.route("/users/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);

module.exports = { userRouter };