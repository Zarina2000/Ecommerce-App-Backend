const { Users } = require("../models/models");

const ResponseModel = require("../utils/responseModel");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  process.env.GOOGLE_ID
);
module.exports = async (req, res, next) => {
  if (req.url == "/products") {
    return next();
  }
  let token = req.headers["authorization"];
  token = token ? token.split(" ")[1] : null;
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  if (token) {
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience:
          "22805011057-sfgcohpdbgp7a0gaq229o0coqlcofrhq.apps.googleusercontent.com",
      });
      return (payload = ticket.getPayload());
    }
    try {
      const {
        email,
        given_name: firstname,
        family_name: lastname,
        picture,
      } = await verify();
      try {
        const user = await Users.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          const user = await Users.create({
            firstname,
            lastname,
            email,
            picture,
          });
        } else {
          const user = await Users.update(
            {
              firstname,
              lastname,
              email,
              picture,
            },
            { where: { email } }
          );
        }
      } catch (err) {
        // res
        //   .status(500)
        //   .json(new ResponseModel(null, null, ["Unable to send feedback."]));
        console.log(err);
      }
      const userDetails = await Users.findOne({
        where: { email: payload.email },
      });

      req.userDetails = {
        email: userDetails.dataValues.email,
        firstname: userDetails.dataValues.firstname,
        lastname: userDetails.dataValues.lastname,
        picture: userDetails.dataValues.picture,
        id: userDetails.dataValues.id,
      };
      return next();
    } catch (e) {
      return res.status(401).json("Unauthorized");
    }
  }
};
