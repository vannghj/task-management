const express = require("express");
const router = express.Router();
const controller = require("../controllers/task.controller");

router.get("/", controller.index);
router.get("/detail/:id", controller.detail);
router.patch("/change-status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.patch("/edit/:id", controller.edit);
router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
module.exports = router;

