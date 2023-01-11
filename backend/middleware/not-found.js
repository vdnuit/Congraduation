const notFoundError = (req, res) => {
    res.status(404).send("<h1>Page Not Found 404</h1>");
}

module.exports = notFoundError;