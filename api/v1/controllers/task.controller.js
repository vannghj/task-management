const Task = require("../modles/task.model");
const searchHelper = require("../../../helpers/search");
const paginationHelper = require("../../../helpers/pagination");
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
        $or: [
            {createdBy: req.user.id},
            { listUser: req.user.id}
        ]
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
}
module.exports.detail = async (req, res) => {
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

}

module.exports.changeStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const status = req.body.status;
        await Task.updateOne({
            _id:id
        }, {
            status: status,
        })
        res.json({
            code: 200,
            message: "Cap nhat trang thai thanh cong"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
module.exports.changeMulti = async (req, res) => {
    try{
        const { ids, key, value } = req.body;
        switch (key) {
            case "status" :
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cap nhat trang thai thanh cong"
                })
                break;
            case "delete":
                await Task.updateMany({
                    _id: {$in: ids}
                }, {
                    deleted: true,
                    deleteAt: new Date()
                });
                res.json({
                    code: 200,
                    message: "Cap nhat trang thai thanh cong"
                })
                break;
            default:
                res.json({
                    code: 400,
                    message: "Khong ton tai"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
module.exports.create = async (req, res) => {
    try{
        req.body.createdBy = req.user.id;
        const task = new Task(req.body);
        const data = await task.save();
        res.json({
            code: 400,
            message: "Tao thanh cong",
            data: data
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id;
        await Task.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 400,
            message: "Tao thanh cong",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
module.exports.delete = async (req, res) => {
    try{
        const id = req.params.id;
        await Task.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteAt: new Date()
        });
        res.json({
            code: 400,
            message: "Tao thanh cong",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}