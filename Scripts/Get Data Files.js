function readCookies() {
    let cookieArr = document.cookie;
    return cookieArr;
}
const jsonData = decodeURIComponent(readCookies()).split(';')
for(var i = 0; i < jsonData.length; i++){
    jsonData[i] = jsonData[i].split('=')[1].trim();
}
jsonData[0] = JSON.parse(jsonData[0])
jsonData = jsonData[0];
module.exports = jsonData;