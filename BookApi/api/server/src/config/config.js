require('dotenv').config();

module.exports = {
    development: {
        database: "book_api",
        username: "postgres",
        password: "postgres",
        host: "127.0.0.1",
        dialect: "postgres",
    },
    test: {
        database: "book_api_test",
        username: "postgres",
        password: "postgres",
        host: "127.0.0.1",
        dialect: "postgres",
    },
}