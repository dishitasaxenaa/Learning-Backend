const  User  = require("../models/user");

async function handleGetAllUser(req, res){
    const users = await User.find({});
    res.status(200).json(users);
}

async function handleInsertAUser(req, res) {
    const newUser = req.body;
    await User.create({
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        email: newUser.email,
        gender: newUser.gender,
        ip_address: newUser.ip_address
    });
    return res.status(201).json({ msg: "success" });
}

async function handleGetUserById(req, res) {
    const userSearched = await User.findById(req.params.id);
    return res.status(200).json(userSearched);
}

async function handleUpdateUser(req, res) {
    const body = req.body;
    await User.findByIdAndUpdate(req.params.id, {...body});
    return res.status(200).json({ msg: "Information updated successfully" });
}

async function handleDeleteUser(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "User deleted successfully" });
}

module.exports = {
    handleGetAllUser,
    handleInsertAUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
}