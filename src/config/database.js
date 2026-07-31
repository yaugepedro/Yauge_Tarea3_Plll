const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'TuPasswordAqui',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'TodoCrudDB',
  options: {
    encrypt: false, // true si usas Azure SQL
    trustServerCertificate: true, // necesario para instancias locales
  },
};

let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config)
      .then((pool) => {
        console.log('Conectado a SQL Server:', config.database);
        return pool;
      })
      .catch((err) => {
        console.error('Error al conectar con SQL Server:', err.message);
        process.exit(1);
      });
  }
  return poolPromise;
}

async function initDatabase() {
  const pool = await getPool();
  const createTableQuery = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='tasks' AND xtype='U')
    CREATE TABLE tasks (
      id INT IDENTITY(1,1) PRIMARY KEY,
      title NVARCHAR(150) NOT NULL,
      description NVARCHAR(MAX),
      completed BIT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `;
  await pool.request().query(createTableQuery);
  console.log('Tabla "tasks" lista.');
}

module.exports = { sql, getPool, initDatabase };