const express = require('express');
const cors = require('cors');
const authMiddleware=require('./src/middlewares/authenticationMiddleware');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({origin: '*'}));
app.use(authMiddleware)
app.use(bodyParser.json({inflate: true}));
app.listen(80);