const logger = require("../utils/logger")

const errorHandler = (error , req , res, next) => {
    logger.error(error.message)

    if(error.name === "CastError"){
        return res.status(400).json({ error : "malformatted id"})
    }
    else if (error.name === "ValidationError"){
        return res.status(400).json( {error : error.message} )
    }

    next(error)
}

module.exports = { errorHandler }