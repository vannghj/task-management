module.exports.registerPost = (req,res, next) => {
    if(!req.body.fullName) {
        res.json({
            code:400,
            message:" Vui long nhap ho ten",
        });
        return;
    }
    if(!req.body.email) {
        res.json({
            code:400,
            message:" Vui long nhap email",
        });
        return;
    }
    if(!req.body.password) {
        res.json({
            code:400,
            message:" Vui long nhap mat khau",
        });
        return;
    }
    next();
}
module.exports.loginPost = (req,res, next) => {
    if(!req.body.email) {
        res.json({
            code:400,
            message:" Vui long nhap email",
        });
        return;
    }
    if(!req.body.password) {
        res.json({
            code:400,
            message:" Vui long nhap mat khau",
        });
    }
    next();
}
module.exports.resetPasswordPost = (req,res, next) => {
    if(!req.body.password) {
        res.json({
            code:400,
            message:" Vui long nhap mat khau",
        });
    }
    if(!req.body.confirmPassword) {
        res.json({
            code:400,
            message:" Vui long nhap xac nhan mat khau",
        });
    }
    if(req.body.password != req.body.confirmPassword) {
        res.json({
            code:400,
            message:"mat khau khong khop",
        });
    }
    next();
}