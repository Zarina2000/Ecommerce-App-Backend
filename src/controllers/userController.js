const { Users } = require('../models/models');
const ResponseModel = require('../../utilities/responseModel');
const TokenHandlers = require('../../utilities/tokenHandlers');

// Get user profile
getUserProfile = async (req, res) => {
    console.log(req.user);
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
