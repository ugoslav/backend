require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.ENV_NODE === "test"
                    ? process.env.TEST_MONGODB_URL
                    : process.env.MONGODB_URL

module.exports = {
    PORT,
    MONGODB_URL
}