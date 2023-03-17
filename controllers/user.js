const UserModel = require('../models/user.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getUserById = async (req, res) => {
        const user = await UserModel.findOne({ id: req.params.id });
        if (!user) {
            return res.json({
                success: false,
                error: "User not found"
            })
        }

        const { password, ...userWithoutPassword } = user;

        return res.json({
            success: true,
            info: userWithoutPassword
        })
    };
    updateUser = async (req, res) => {
        const user = await UserModel.findOne({ id: req.body.id });
        if (!user) {
            return res.json({
                success: false,
                error: "User not found"
            })
        }

        let { id, ...restOfUpdates } = req.body;
        let images = req.files;
        if(images?.profile_image) 
            restOfUpdates.profile_image = images.profile_image[0].path;

        const result = await UserModel.update(restOfUpdates, req.body.id);

        if (!result) {
            return res.json({
                success: false,
                error: "Update user info failed"
            })
        }

        const { affectedRows } = result;

        const message = !affectedRows ? 'User not found' : 'User updated successfully';

        return res.json({success: true,  message });
    }
}


module.exports = new UserController;