const { Products } = require('../models/models');
const ResponseModel = require('../utils/responseModel');
const { Op }= require('sequelize') 


const addProduct = async (req, res) => {
    const product_name = req.body.name;
    const price = req.body.price;
    const product_image = req.body.image;
    var products = await Products.create({
        product_name: product_name,
        price: price,
        product_image: product_image
    });
    res.json(new ResponseModel('JSDHBFJRHBFH'));
    console.log(products)

}

const getAllProducts = async (req, res) => {
   
    if (req.query) {
        if (req.query.sort == 'asc') {
            var filter = { order: [['price', 'ASC']] }
        }
        else if (req.query.sort == 'desc') {
            var filter = { order: [['price', 'DESC']] }
        }
        if(req.query.min && req.query.max && req.query.sort)  
        {
         var filter  = {
           where: {
                price: {
                  [Op.gte]: req.query.min,
                  [Op.lte]: req.query.max,
                }
              },
              order: [['price', req.query.sort]]
            }
        }  
        else if(req.query.min && req.query.sort)  
        {
         var filter  = {
           where: {
                price: {
                  [Op.gte]: req.query.min
                }
              },
              order: [['price', req.query.sort]]
            }
        }
        else if(req.query.max && req.query.sort)  
        {
         var filter  = {
           where: {
                price: {
                  [Op.lte]: req.query.max
                }
              },
              order: [['price', req.query.sort]]
            }
        }  
    }
        const product = await Products.findAll(filter);
        res.json(new ResponseModel(product));
    }

    module.exports = { addProduct, getAllProducts }