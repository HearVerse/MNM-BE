const { body } = require('express-validator');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.createUserSchema = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
];

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const path = `./upload/`;
        fs.mkdirSync(path, { recursive: true })
        callback(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + "-" + file.originalname)
    }
})

exports.uploadMulti = multer({
    storage: storage, 
    fileFilter: (req, file, callback) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
}).fields([
    {name: 'profile_image', maxCount: 1},
]);