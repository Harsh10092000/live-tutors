import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const poolLogs = mysql.createPool({
  host: process.env.MYSQL_HOST_LOG,
  user: process.env.MYSQL_USER_LOG,
  password: process.env.MYSQL_PASSWORD_LOG,
  database: process.env.MYSQL_DATABASE_LOG,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});




export default pool; 