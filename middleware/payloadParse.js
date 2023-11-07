const payloadParsing = (req, res, next) => {
    req.payload = Object.assign({}, req.body, req.query);
    next();
}

module.exports = payloadParsing;