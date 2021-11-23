const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

const conn = mysql.createConnection({
    host: '',
    port: 3306,
    database: '',
    user: '',
    password: '',
})

const sql = "UPDATE recommend_place set priority = 1 where placeId in (?)";

const file = fs.readFileSync('./place.csv', { encoding: 'utf-8' });
const rows = file.split("\n");
const result = [];

for (let rowIndex in rows) {
    if (rowIndex == 0) continue;
    const row = rows[rowIndex].split('\r');
    result.push(row[0].split('\"')[1]);
}

conn.query(sql, [result], function(err) {
    console.log(err)
    conn.end();
})