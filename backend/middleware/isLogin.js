//로그인 상태
    // 회원가입, 로그인 라우터 접근x
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){ //passport가 req에 넣은 메서드
        next();
    }
    else{
        res.status(403).send("로그인 필요");
    }
};

//비로그인 상태
    // 로그아웃 라우터 접근x
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