const { connect } = require('../config/mongoDB.js')

async function testConnect() {
    const db = await connect();
    await db.command({ ping: 1 })
    return ("  ~ Successfully connected to MongoDB!");
}


const auth = {
    login: async (username) => {
        const db = await connect();
        return await db.collection('login').findOne({
            username: username
        })
    }
}

module.exports = {
    testConnect,
    auth
}