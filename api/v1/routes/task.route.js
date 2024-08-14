const express = require("express");
const router = express.Router();
const Task = require("../../../modles/task.model");
router.get("/", async (req, res) => {
    const find = {
        deleted: false
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    const tasks = await Task.find(find);
    res.json(tasks);
});
router.get("/detail/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Task.findOne({
            _id: id,
            deleted: false,
        })
        res.json(tasks);
    } catch (error) {
        res.json("khong tim thay");
    }

});
module.exports = router;

