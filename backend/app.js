const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const passport = require('passport');
const connectDB = require('./db/connect');
require('dotenv').config(); // dotenv
require('express-async-errors'); // async error handling
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const errorHandler = require('./middleware/error-handler');
const notFoundError = require('./middleware/not-found');
const passportConfig = require('./passport/passport-config');
passportConfig(); //passport.use()

// session
    // 아래 passport메서드가 이 세션에 의존하기 때문에 앞에 선언해야 함
app.use(passport.session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(express.json()); // body-parser

app.use('/auth', authRouter);
app.use('/api/v1/users', userRouter);

// passport
app.use(passport.initialize()); //session을 초기화 (req에 passport 설정을 심음)
app.use(passport.session()); //deserializeUser 호출

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