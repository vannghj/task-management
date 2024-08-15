const taskRoutes = require("./task.route");
const UserRoutes = require("./user.route");
const authMiddleWare = require("../middlewares/auth.middleware");
module.exports = (app) => {
    const version = "/api/v1";
    app.use(`${version}/tasks`,authMiddleWare.requireAuth,taskRoutes);
    app.use(`${version}/users`,UserRoutes);
}