const express = require('express');
const app = express();
const session = require('express-session');
const PORT = process.env.port || 8000;
const passport = require('passport');
const connectDB = require('./db/connect');
require('dotenv').config(); // dotenv
require('express-async-errors'); // async error handling
const routes = require('./routes');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const errorHandler = require('./middleware/error-handler');
const notFoundError = require('./middleware/not-found');
const { kakaoLogout } = require('./controllers/auth');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// session
    // 아래 passport메서드가 이 세션에 의존하기 때문에 앞에 선언해야 함
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(express.json()); // body-parser

// app.use('/auth', authRouter); // authenticate
// app.use('/api/v1/users', userRouter);

// passport
app.use(passport.initialize()); //session을 초기화 (req에 passport 설정을 심음)
app.use(passport.session()); //deserializeUser 호출

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