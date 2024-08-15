const User = require("../../../modles/User.model");
const md5 = require("md5");
module.exports.register = async (req, res) => {
    try{
        req.body.password = md5(req.body.password);
        const existEmail = await User.findOne({
            email: req.body.email,
            deleted: false,
        });

        if(existEmail) {
            res.json({
                code : 400,
                message: "Email da ton tai"
            });
        } else {
            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            })
            await user.save();
            const token = user.token;
            res.cookie("token", token);
            res.json({
                code: 200,
                message: "Tao tai khoan thanh cong",
                token: token
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}