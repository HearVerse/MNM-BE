const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const { checkValidation } = require("../utils/utils");


const login = asyncHandler(async (req, res) => {
    const validation = checkValidation(req, res);
    if(validation) {
        return res.json({
            success: false,
            error: validation,
        });
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.json({
            success: false,
            error: 'Your email does not registered'
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.json({
            success: false,
            error: 'Invalid email or password'
        })
    }
    return res.json({ success: true});
})

module.exports = login;