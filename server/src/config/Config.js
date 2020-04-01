/// Configuration file for the database, ENV, PORT, & ETC..

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'hypertube',
        user: process.env.DB_USER || 'maloua-h',
        password: process.env.DB_PW || 'hypertube42',
    },
}