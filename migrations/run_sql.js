const fs = require('fs');
const path = require('path');
const connectToDB = require('../config/db'); 

async function runSQLFile() {
  const filePath = path.join(__dirname, '../sql/create_tables.sql');
  const connection = await connectToDB();

  try {
    const sql = fs.readFileSync(filePath, 'utf8');

    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (let statement of statements) {
      console.log(`Executing: ${statement.slice(0, 50)}...`);
      await connection.query(statement);
    }
    console.log('Tables created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to execute SQL script:', err.message);
    process.exit(1); 
  } finally {
    await connection.end();
  }
}

runSQLFile();
