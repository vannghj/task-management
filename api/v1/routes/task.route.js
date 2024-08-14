const express = require("express");
const router = express.Router();
const Task = require("../../../modles/task.model");
const paginationHelper = require("../../../helpers/pagination")
const searchHelper = require("../../../helpers/search")

router.get("/", async (req, res) => {
    const find = {
        deleted: false
    }
    if(req.query.status) {
        find.status = req.query.status;
    }
    const objectSearch = searchHelper(req.query);
    let keyword = "";
    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    //pagination
    const coutTask = await Task.countDocuments(find);
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItem: 2
        },
        req.query,
        coutTask
    );
    //end pagination
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    const sort = {};
    if(sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    const tasks = await Task.find(find)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
        .sort(sort);
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

