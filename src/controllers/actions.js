const am = require('../models/actions');

module.exports = {
  all: async (req, res, next) => {
    try {
      const actions = await am.get();

      if (actions.length === 0)
        next({ code: 404, message: "There are no actions." });
      else
        res.status(200).json({ actions, success: true });
    } catch (err) {
      next({ code: 500, message: "Actions could not be retrieved." });
    }
  }
};