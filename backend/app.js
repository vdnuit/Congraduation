const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const connectDB = require('./db/connect');

require('dotenv').config();

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