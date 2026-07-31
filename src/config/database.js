
let tasks = [];
let nextId = 1;

function initDatabase() {
  console.log('Base de datos inicializada correctamente.');
}

module.exports = { tasks, initDatabase, getNextId: () => nextId++ };