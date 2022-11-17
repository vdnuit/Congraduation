const notFoundError = (req, res) => {
    res.status(404).send("There is no route like that");
}

module.exports = notFoundError;