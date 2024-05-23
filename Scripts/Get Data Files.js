function readCookies() {
    let cookieArr = document.cookie.split(";a");
    return cookieArr;
}
const jsonData = readCookies();
console.log(jsonData);
module.exports = jsonData;