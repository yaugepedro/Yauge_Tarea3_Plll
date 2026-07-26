const { sql, getPool } = require('../config/database');

function nowDate() {
  return new Date();
}

const TaskModel = {
  async create({ title, description }) {
    const pool = await getPool();
    const timestamp = nowDate();
    const result = await pool.request()
      .input('title', sql.NVarChar(150), title)
      .input('description', sql.NVarChar(sql.MAX), description || '')
      .input('created_at', sql.DateTime, timestamp)
      .input('updated_at', sql.DateTime, timestamp)
      .query(`
        INSERT INTO tasks (title, description, completed, created_at, updated_at)
        OUTPUT INSERTED.*
        VALUES (@title, @description, 0, @created_at, @updated_at)
      `);
    return result.recordset[0];
  },

  async findAll() {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.recordset;
  },

  async findById(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM tasks WHERE id = @id');
    return result.recordset[0];
  },

  async update(id, { title, description, completed }) {
    const pool = await getPool();
    const timestamp = nowDate();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('title', sql.NVarChar(150), title ?? null)
      .input('description', sql.NVarChar(sql.MAX), description ?? null)
      .input('completed', sql.Bit, typeof completed === 'boolean' ? completed : null)
      .input('updated_at', sql.DateTime, timestamp)
      .query(`
        UPDATE tasks
        SET title = COALESCE(@title, title),
            description = COALESCE(@description, description),
            completed = COALESCE(@completed, completed),
            updated_at = @updated_at
        WHERE id = @id
      `);
    return result.rowsAffected[0];
  },

  async delete(id) {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM tasks WHERE id = @id');
    return result.rowsAffected[0];
  },
};

module.exports = TaskModel;