const { Users } = require('../models/models');
const ResponseModel = require('../utils/responseModel');

// Get user profile
const getUserProfile = async (req, res) => {
    // console.log(req.user);
    try {
        const Profile = await Users.findOne(
            {
                where:
                    { id: req.user.id }
            });
        res.json(new ResponseModel(Profile));
    }
    catch (err) {
        res.send(err);
    }
}


module.exports = { getUserProfile }
