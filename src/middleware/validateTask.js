function validateCreateTask(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'El campo "title" es obligatorio y debe ser un texto no vacio.' });
  }

  if (title.length > 150) {
    return res.status(400).json({ error: 'El campo "title" no puede superar los 150 caracteres.' });
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    return res.status(400).json({ error: 'El campo "title" debe ser un texto no vacio.' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'El campo "completed" debe ser booleano (true/false).' });
  }

  next();
}

function validateIdParam(req, res, next) {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    return res.status(400).json({ error: 'El parametro "id" debe ser numerico.' });
  }
  next();
}

module.exports = { validateCreateTask, validateUpdateTask, validateIdParam };