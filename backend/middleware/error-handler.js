const errorHandler = async (err, req, res, next) => {
    return res.status(500).json({msg: "Something is wrong, please try again."});
}

module.exports = errorHandler;