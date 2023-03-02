const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const {hashPassword, checkValidation} = require("../utils/utils");

const register = async (req, res) => {
    const validation = checkValidation(req, res);
    if(validation) {
        return res.json({
            success: false,
            error: validation,
        });
    }
    await hashPassword(req);

    const result = await UserModel.create(req.body);
    if (!result) {
        return res.json({
            success: false,
            error: "Duplicate User"
        })
    }

    return res.json({
        success: true
    })
}

module.exports = register;