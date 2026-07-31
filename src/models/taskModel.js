const { tasks, getNextId } = require('../config/database');

function nowISO() {
  return new Date().toISOString();
}

const TaskModel = {
  async create({ title, description }) {
    const timestamp = nowISO();
    const newTask = {
      id: getNextId(),
      title,
      description: description || '',
      completed: false,
      created_at: timestamp,
      updated_at: timestamp,
    };
    tasks.unshift(newTask);
    return newTask;
  },

  async findAll() {
    return tasks;
  },

  async findById(id) {
    return tasks.find((t) => t.id === Number(id));
  },

  async update(id, { title, description, completed }) {
    const task = tasks.find((t) => t.id === Number(id));
    if (!task) return 0;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    task.updated_at = nowISO();
    return 1;
  },

  async delete(id) {
    const index = tasks.findIndex((t) => t.id === Number(id));
    if (index === -1) return 0;
    tasks.splice(index, 1);
    return 1;
  },
};

module.exports = TaskModel;