const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){ //passport가 req에 넣은 메서드
        next();
    }
    else{
        res.status(401).json({message: 'Unauthorized'});
    }
};

const isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }
    else{
        res.json({message: 'Already authenticated'});
    }
};

module.exports = {
    isLoggedIn,
    isNotLoggedIn
}