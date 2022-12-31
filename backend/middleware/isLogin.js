const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){ //passport가 req에 넣은 메서드
        next();
    }
    else{
        res.status(403).send("로그인 필요");
    }
};

const isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        res.send({message: '로그인 상태'});
    }
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn
}