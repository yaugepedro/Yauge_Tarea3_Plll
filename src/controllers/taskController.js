const TaskModel = require('../models/taskModel');

async function getAllTasks(req, res) {
  try {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las tareas.', details: err.message });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la tarea.', details: err.message });
  }
}

async function createTask(req, res) {
  try {
    const newTask = await TaskModel.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la tarea.', details: err.message });
  }
}

async function updateTask(req, res) {
  try {
    const existing = await TaskModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Tarea no encontrada.' });

    await TaskModel.update(req.params.id, req.body);
    const updated = await TaskModel.findById(req.params.id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar la tarea.', details: err.message });
  }
}

async function deleteTask(req, res) {
  try {
    const existing = await TaskModel.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Tarea no encontrada.' });

    await TaskModel.delete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la tarea.', details: err.message });
  }
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };