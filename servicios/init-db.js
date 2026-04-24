require('dotenv').config();
const fs = require('fs');
const pool = require('./config/db');

async function initDB() {
 try {

   //const sql = fs.readFileSync('./schema.sql').toString();

   const result = await pool.query('SELECT * FROM mascotas');

   console.log('Tablas creadas correctamente', result.rows);

 } catch(err){
   console.error(err);
 } finally{
   await pool.end();
 }
}

initDB();