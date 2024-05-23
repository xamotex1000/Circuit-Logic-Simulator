function readCookies() {
    let cookieArr = document.cookie.split(";");
    return cookieArr;
}
const jsonData = readCookies();
var string = document.createElement('h1');
string.appendChild(jsonData)
document.getElementsByTagName('body')[0].appendChild(string);
module.exports = jsonData;