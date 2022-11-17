const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const connectDB = require('./db/connect');
require('dotenv').config(); // dotenv
require('express-async-errors'); // async error handling
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/error-handler');
const notFoundError = require('./middleware/not-found');


app.use(express.json()); // body-parser
app.use('/api/v1/users', usersRouter); // api
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