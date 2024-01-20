const { ObjectId } = require("mongodb");
const { connect } = require('../config/mongoDB.js')

async function testConnect() {
    const db = await connect();
    await db.command({ ping: 1 })
    return ("  ~ Successfully connected to MongoDB!");
}


const user = {
    get: async (userid) =>  {
        const db = await connect(userid);
        return await db.collection('user').findOne({
            _id: new ObjectId(userid)
        }) 
    }
}


const auth = {
    login: async (username) => {
        const db = await connect();
        return await db.collection('user').findOne({
            username: username
        })
    }
}

module.exports = {
    testConnect,
    auth,
    user
}