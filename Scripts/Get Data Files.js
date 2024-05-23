function readCookies() {
    let cookieArr = document.cookie.split(";");
    return cookieArr;
}
const jsonData = readCookies();
console.log(jsonData);
module.exports = jsonData;