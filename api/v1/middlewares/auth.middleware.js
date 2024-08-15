const User = require("../modles/user.model");
module.exports.requireAuth = async (req, res, next) =>{
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            token: token,
            deleted: false,
        }).select("-password");
        if(!user) {
            res.json({
                code:400,
                message: "token khong hop le"
            });
            return;
        }
        req.user = user;
        next();
    } else {
        res.json({
            code:400,
            message: "vui long gui kem token"
        })
    }
}