function readCookies() {
    let cookieArr = document.cookie;
    return cookieArr;
}
const jsonData = decodeURIComponent(readCookies()).split(';')
console.log(jsonData)
for(var i = 0; i < jsonData.length; i++){
    console.log(i)
    jsonData[i] = jsonData[i].split('=')[1].trim();
}
jsonData[0] = JSON.parse(jsonData[0])
console.log(jsonData)
jsonData = jsonData[0];
module.exports = jsonData;