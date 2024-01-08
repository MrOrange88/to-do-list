function jsonOrRender(req, res, next) {
    res.jsonOrRender = function(template, data) {
        const accept = req.headers.accept || ''
        switch(true) {
            case accept.indexOf('application/json') >= 0:
                return res.json(data)
            default: 
                return res.render(template, data)
        }
    }
    next()
}

module.exports = {
    jsonOrRender
}