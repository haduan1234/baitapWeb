import mysql from 'mysql'

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1903',
    database: "projectweb"
});

export default db;