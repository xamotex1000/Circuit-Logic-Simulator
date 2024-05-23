function readCookies() {
    let cookieArr = document.cookie.split(";");
}

const jsonData = readCookies();
module.exports = jsonData;