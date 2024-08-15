const User = require("../../../modles/user.model");
const ForgotPassword = require("../../../modles/forgot-password.model");
const md5 = require("md5");
const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");
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
module.exports.login = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user) {
            res.json({
                code:400,
                message:" Email khong ton tai",
            });
            return;
        }
        if(md5(password) !== user.password) {
            res.json({
                code:400,
                message:"Mat khau khong dung",
            });
            return;
        }
        const token = user.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Dang nhap thanh cong"
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}
module.exports.forgotPassword = async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({
            email: email,
            deleted: false
        })
        if(!user) {
            res.json({
                code:400,
                message:" Email khong ton tai",
            });
            return;
        }
        const otp = generateHelper.generateRandomNumber(5);
        const timeExpire = 5;
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now(),
        }
        const forgotPassword = new ForgotPassword(objectForgotPassword);
        await forgotPassword.save();
        //Gui OTP qua email user
        const subject = "Ma OTP xac minh lay lai mat khau";
        const html = `Ma OTP de lay lai mat khau la <b>${otp}</b>. Thoi han su dung la 3 phut.`
        sendMailHelper.sendMail(email, subject, html);
        res.json({
            code: 200,
            message:" da gui ma OTP qua email!"
        })

    } catch (error) {
        res.json({
            code: 400,
            message: "Khong ton tai"
        })
    }
}