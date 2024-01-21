const validate = require("../functions/validator.js");
const Database = require("../functions/queryDB.js");

module.exports = {
    get: async (req, res) => {
        const {error, value} = validate.id(req._id)
        if (error) throw error

        const response = await Database.gym.get(value)

        return res.send(response)
    },
    post: async (req, res) => {
        req.body.user_id = req._id
        const {error, value} = validate.gym.post(req.body)
        if (error) throw error

        const response = await Database.gym.post(value)

        return res.send(response)
    }
}