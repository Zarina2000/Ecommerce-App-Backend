const express = require('express');
const cors = require('cors');
const authMiddleware=require('./src/middlewares/authenticationMiddleware');
const bodyParser = require('body-parser');
const router = require('./src/routes/routes');
const app = express();
app.use(cors({origin: '*'}));
app.use(authMiddleware)
app.use(bodyParser.json({inflate: true}));
app.use(router)
app.listen(80);