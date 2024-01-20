const validate = require("../functions/validator.js");
const Database = require("../functions/queryDB.js");

module.exports = {
    get: async (req, res) => {
        const {error, value} = validate.id(req.query.id)
        if (error) throw error

        const user = await Database.user.get(value)

        return res.send(user)
    }
}