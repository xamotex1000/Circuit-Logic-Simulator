function writeCookie(Data){
    document.cookie="user="+encodeURIComponent(json.stringify(Data))+"; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/";
}
module.exports = { writeCookie };