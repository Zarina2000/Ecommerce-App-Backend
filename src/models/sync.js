
const {Users,Products} = require('./models');
 Users.sync({alter: true});
 Products.sync({alter: true});

