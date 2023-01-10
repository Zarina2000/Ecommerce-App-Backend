const { Sequelize, DataTypes } = require('sequelize');
// Importing Sequelize for creating DB and tables


// Create instance of sequalize
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Experion@123',
    database: 'ecommerce'
});

// Define user model
const Users = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    picture: {
        type: DataTypes.STRING(100),
        allowNull: true,
    }
});

// Define product model
const Products = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_image: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
});

module.exports.Users = Users;
module.exports.Products = Products;