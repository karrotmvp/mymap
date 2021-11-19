const mysql = require('mysql');
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;

const conn = mysql.createConnection({
    host: '',
    port: 3306,
    database: '',
    user: '',
    password: '',
})

const sql = "INSERT INTO recommend_place (placeId, regionId) VALUES ?";
const values = [];

const file = fs.readFileSync('./place_list.csv', {encoding: 'utf-8'});
const rows = file.split("\n");
const result = [];

for (let rowIndex in rows) {
    if(rowIndex == 0) continue;
    const row = rows[rowIndex].split(",");
    const placeId = row[0];
    result.push(placeId)
}

// const req_arr = [];
// result.map((place, index) => {
//     if (index % 100 == 0) req_arr.push([]);
//     req_arr[parseInt(index / 100)].push(place);
// })
index = 0;
const err_arr = [];
const interval = setInterval(function() {
    console.log(index);
    const id = result[index];
    if (id) {
        axios.get('' + id)
    .then(res => {
        const poi_id = res.data.id;
        const coordinates = res.data.coordinates;
        axios.get('', {
            params: {
                lat: coordinates.latitude,
                lng: coordinates.longitude
            },
            headers: {
                "X-Api-Key": ""
            }
        })
        .then(response => {
            const regionId = response.data.data.regions[0].id;
            const value = [poi_id, regionId];
            values.push(value);
            index++;
        })
        .catch(e => {
            console.log(e)
        })
}).catch(e => {
    console.log(e)
    err_arr.push(id);
    index++;
})
}
if (index === result.length){
    clearInterval(interval);
    conn.query(sql, [values], function(err) {
        console.log(err);
        conn.end();
    })
    console.log(err_arr);
}
}, 1000)