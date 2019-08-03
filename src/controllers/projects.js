const pm = require('../models/projects');

module.exports = {
  all: async (req, res, next) => {
    try {
      const projects = await pm.get();

      if (projects.length === 0)
        next({ code: 404, message: "There are no projects." });
      else
        res.status(200).json({ projects, success: true });
    } catch (err) {
      next({ code: 500, message: "Projects could not be retrieved." });
    }
  }
}