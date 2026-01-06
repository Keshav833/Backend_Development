const express = require('express');

const router = express.Router();

const {
    handleCreateUserasync , handleGetAllUsers, handleGetUserById, handleUpdateUser, handleDeleteUser } = require('../controllers/user')
// router.get('/', async (req, res)=>{
//     const AllUsers = await User.find({});
//     const html = `
//     <ul>
//      ${AllUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`)
//      .join("")}
//     </ul>
//     `
//     res.send(html);
// })



router.post('/', handleCreateUserasync)

router.get("/", handleGetAllUsers)

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser)

module.exports = router;
