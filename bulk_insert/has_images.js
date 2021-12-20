const axios = require('axios').default;
const fs = require('fs');

const file = fs.readFileSync('./result.csv', {encoding: 'utf-8'});
const rows = file.split("\n");
const result = [];

for (let rowIndex in rows) {
    const row = rows[rowIndex].split("\"");
    const placeId = row[1];
    result.push(placeId)
}

try {
axios.get('', {
    params: {
        ids: result
    }
}).then(res => {
    const places = res.data;
    for (let place in places) {
        if (places[place].images.length) console.log(places[place].id);
        // console.log(place.images)
    }
}).catch(e => console.log(e))
} catch (e) {
    console.log(e)
}