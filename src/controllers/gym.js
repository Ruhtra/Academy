const validate = require("../functions/validator.js");
const Database = require("../functions/queryDB.js");

module.exports = {
    post: async (req, res) => {
        const {error, value} = validate.gym.post(req.body)
        if (error) throw error

        const response = await Database.gym.post(value)

        return res.send(response)
    }
}