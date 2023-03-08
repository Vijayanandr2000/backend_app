const userController  = require("../controller/index");
const { validateUserId } = require("../middleware/index")

module.exports = (app) => {
    app.get(
        "/user/:id",
        [validateUserId],
        userController.findUserById
    )
    app.get(
        "/customfield",
        userController.findCustomFieldByName
    )
    app.put(
        "/user/customfield/:id",
        [validateUserId],
        userController.updateCustomFieldForUser
    )
}