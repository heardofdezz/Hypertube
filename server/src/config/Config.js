/// Configuration file for the database, ENV, PORT, & ETC..

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'hypertube',
        user: process.env.DB_USER || 'tracker',
        password: process.env.DB_PW || 'tracker',
    },
}