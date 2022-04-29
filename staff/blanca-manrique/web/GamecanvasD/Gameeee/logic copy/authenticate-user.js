function authenticateUser(username, password, callback) {
 var xhr = new XMLHttpRequest
 xhr.open('POST','https://b00tc4mp.herokuapp.com/api/v2/users/auth')
 xhr.addEventListener('load', function(){
     if(this.status === 400 || this.status === 401){
        var res = JSON.parse(this.responseText)
        var error = res.error
        callback(new Error(error))   
     }else if( this.status === 200){
        var res = JSON.parse(this.responseText)
        callback(null, res.token)
     }
 })
    xhr.setRequestHeader('Content-type', 'application/json')

    var data = {}

    data.username = username
    data.password = password
    var json = JSON.stringify(data)

    xhr.send(json)
}
// registerUser('blancamanrique13', '121212', function(error, token) {
// console.log(error, token)
// })