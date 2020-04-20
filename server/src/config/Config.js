/// Configuration file for the database, ENV, PORT, & ETC..

module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || 'test',
        user: process.env.DB_USER || 'maloua-h',
        password: process.env.DB_PW || 'hypertube42',
    },
    //Token auth using jsonwebtoken
    authentification: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    },
    email: {
        user: 'louamax ',
        password: 'lastmen00'
    }
}
