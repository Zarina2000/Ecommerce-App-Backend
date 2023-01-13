
const { Users } = require('../models/models');

const ResponseModel = require('../utils/responseModel');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("374035105640-guglehdgf9jfs03cd2aho3r5hgf118et.apps.googleusercontent.com");
module.exports = async (req, res, next) => {
    if (req.url == '/products') {
        return next();
    }
    let token = req.headers['authorization'];
    token = token ? token.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json("Unauthorized");
    }
    if (token) {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "22805011057-sfgcohpdbgp7a0gaq229o0coqlcofrhq.apps.googleusercontent.com",
            });
            return payload = ticket.getPayload();
        }
        try {
            const payload = await verify();
            try {
                // console.log(payload);
                const user = await Users.findOne({
                    where: {
                        email: payload.email
                    }
                })
                if (!user) {
                    const user = await Users.create({
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        email: payload.email,
                        picture: payload.picture,
                    });
                }
                else {
                    const user = await Users.update({
                        firstname: payload.given_name,
                        lastname: payload.family_name,
                        email: payload.email,
                        picture: payload.picture,
                    },
                        { where: { email: payload.email } })
                }
               
            }
            catch (err) {
                // console.log(err);
                res.status(500).json(new ResponseModel(null, null, ['Unable to send feedback.']));
            }
            const userDetails = await Users.findOne({ where: { email: payload.email } })
            req.userDetails = {
                email: userDetails.dataValues.email,
                firstname: userDetails.dataValues.firstname,
                lastname: userDetails.dataValues.lastname,
                picture: userDetails.dataValues.picture,
                id: userDetails.dataValues.id
            }
            return next()
        }
        catch (e) {
            return res.status(401).json("Unauthorized")
        }
    }
}