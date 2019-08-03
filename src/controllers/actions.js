const am = require('../models/actions');
const pm = require('../models/projects');

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
  },
  new: async (req, res, next) => {
    const data = req.body;
    const length = Object.keys(data).length;
    const { project_id, description, notes } = data;
        
    try { 
      const project = await pm.get(project_id);
      
      if (!project) {
        next({ code: 404, message: "This project does not exist." });
      } else {
        if (length === 0)
          next({ code: 400, message: "Missing action data." }); 
  
        if (length > 0 && !project_id || !description || !notes)
          next({ code: 400, message: "Missing required project_id, description, or notes field." });
        
        const newAction = await am.insert(data); 

        if (newAction) 
          res.status(201).json({ action: newAction, success: true });
      }
    } catch (err) {
      next({ code: 500, message: "Action could not be saved." });
    }
  },
  rm: async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleted = await am.remove(id);

      if (!deleted)
        next({ code: 400, message: "This action does not exist." });
      else
        res.status(200).json({ message: `Action ID ${id} deleted.`, success: true });
    } catch (err) {
      next({ code: 500, message: "Action could not be deleted." });
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const length = Object.keys(data).length;

    try { 
      if (length === 0)
        next({ code: 400, message: "Missing action data." });

      const updatedAction = await am.update(id, data); 

      if (!updatedAction)
        next({ code: 400, message: "This action does not exist." });
      else 
        res.status(200).json({ action: updatedAction, success: true });
    } catch (err) {
      next({ code: 500, message: "Action could not be updated." });
    }
  }
};