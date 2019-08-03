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
  },
  one: async (req, res, next) => {
    try {
      const project = await pm.get(req.params.id);

      if (!project)
        next({ code: 404, message: "This project does not exist." });
      else
        res.status(200).json({ project, success: true });
    } catch (err) {
      next({ code: 500, message: "Project could not be retrieved." });
    }
  }
};