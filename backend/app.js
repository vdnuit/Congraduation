const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.port || 8000;
const passport = require('passport');
const connectDB = require('./db/connect');
// const MongoDBSession = require('connect-mongodb-session')(session);
require('dotenv').config(); // dotenv
require('express-async-errors'); // async error handling
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const notFoundError = require('./middleware/not-found');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', //http://www.congraduation-skku.com, http://congraduation-skku.com
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.json()); // body-parser

app.use('/', routes); // 모듈명을 명시하지 않으면 routes/index.js를 로드

app.use(errorHandler); // server error
app.use(notFoundError); // page not found

const run = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
    catch(err){
        console.log(err);
    }
};



run();