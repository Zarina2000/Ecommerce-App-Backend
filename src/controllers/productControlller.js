const { Products } = require("../models/models");
const ResponseModel = require("../utils/responseModel");
const { Op } = require("sequelize");

const addProduct = async (req, res) => {
  const { name: product_name, price, image: product_image } = req.body;
  var products = await Products.create({
    product_name,
    price,
    product_image,
  });
  res.json(new ResponseModel("Success"));
  console.log(products);
};

const getAllProducts = async (req, res) => {
  const { sort, min, max } = req.query;
  if (req.query) {
    if (sort == "asc") {
      var filter = { order: [["price", "ASC"]] };
    } else if (sort == "desc") {
      var filter = { order: [["price", "DESC"]] };
    }
    if (min && max && sort) {
      var filter = {
        where: {
          price: {
            [Op.gte]: min,
            [Op.lte]: max,
          },
        },
        order: [["price", sort]],
      };
    } else if (min && sort) {
      var filter = {
        where: {
          price: {
            [Op.gte]: min,
          },
        },
        order: [["price", sort]],
      };
    } else if (max && sort) {
      var filter = {
        where: {
          price: {
            [Op.lte]: max,
          },
        },
        order: [["price", sort]],
      };
    }
  }
  const product = await Products.findAll(filter);
  res.json(new ResponseModel(product));
};

module.exports = { addProduct, getAllProducts };
