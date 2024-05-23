function readCookies() {
    let cookieArr = document.cookie.split(";");
    return cookieArr;
}
const jsonData = readCookies();
document.getElementsByTagName('body')[0].appendChild(jsonData);
module.exports = jsonData;