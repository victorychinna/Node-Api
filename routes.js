module.exports = function (app) {
var users=require("./controllers/userController.js");
/*Route for get all users users Data*/
 app.get("/users/getAll", users.getAllUsers);
 /* Route for get  user by id*/
 app.get("/users/getUser/:userId", users.getUserById);
 /* Route for  user login*/
 app.post("/users/login", users.userLogin);
}
