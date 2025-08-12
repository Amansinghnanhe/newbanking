const fs = require('fs');
const path = require('path');
const pool = require('../config/db'); 

async function runSQLFile() {
  const filePath = path.join(__dirname, '../sql/create_tables.sql');

  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    for (let statement of statements) {
      console.log(`Executing: ${statement.slice(0, 50)}...`);
      await pool.query(statement);
    }
    console.log('Tables created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to execute SQL script:', err.message);
    process.exit(1);
  }
}

runSQLFile();
