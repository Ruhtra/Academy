const validate = require("../functions/validator.js");
const Database = require("../functions/queryDB.js");

module.exports = {
    get: async (req, res) => {
        const {error, value} = validate.gym.id(req.query.id)
        if (error) throw error

        const user = await Database.gym.get(value.id)

        return res.send(user)
    }
}