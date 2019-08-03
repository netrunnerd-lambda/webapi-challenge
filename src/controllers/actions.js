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
  },
  one: async (req, res, next) => {
    try {
      const action = await am.get(req.params.id);

      if (!action)
        next({ code: 404, message: "This action does not exist." });
      else
        res.status(200).json({ action, success: true });
    } catch (err) {
      next({ code: 500, message: "Action could not be retrieved." });
    }
  }
};