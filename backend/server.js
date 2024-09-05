// Packages import
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

// Module import
const connection = require('./config/connection');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/users', userRoutes); 

connection();

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on ${process.env.PORT}`);
});

