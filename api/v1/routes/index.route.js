const taskRoutes = require("./task.route");
const UserRoutes = require("./user.route");
module.exports = (app) => {
    const version = "/api/v1";
    app.use(`${version}/tasks`,taskRoutes);
    app.use(`${version}/users`,UserRoutes);
}