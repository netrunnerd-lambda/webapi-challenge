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
  },
  new: async (req, res, next) => {
    const data = req.body;
    const length = Object.keys(data).length;
    const { name, description } = data;
        
    try { 
      if (length === 0)
        next({ code: 400, message: "Missing project data." }); 
  
      if (length > 0 && !name || !description)
        next({ code: 400, message: "Missing required name or description field." });
      
      const newProject = await pm.insert(data); 

      if (newProject) 
        res.status(201).json({ newProject, success: true });
    } catch (err) {
      next({ code: 500, message: "Project could not be saved." });
    }
  },
  rm: async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleted = await pm.remove(id);

      if (!deleted)
        next({ code: 400, message: "This project does not exist." });
      else
        res.status(200).json({ message: `Project ID ${id} deleted.`, success: true });
    } catch (err) {
      next({ code: 500, message: "Project could not be deleted." });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const length = Object.keys(data).length;

    try { 
      if (length === 0)
        next({ code: 400, message: "Missing project data." });

      const updatedProject = await pm.update(id, data); 

      if (!updatedProject)
        next({ code: 400, message: "PThis project does not exist." });
      else
        res.status(200).json({ updatedProject, success: true });
    } catch (err) {
      next({ code: 500, message: "Project could not be updated." });
    }
  },
};