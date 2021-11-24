function registreUser(name, username, password, callback) {
    if (typeof name !== 'string') throw new TypeError(name + ' is not string')
    if (!username.trim()) throw new Error('name is empty or blank')

    if (typeof username !== 'string') throw new TypeError(username + ' is not string')
    if (!username.trim()) throw new Error('username is empty or blank')

    if (typeof password !== 'string') throw new TypeError(password + 'is not string')
    if (!password.trim()) throw new Error('password is empty or blank')
    if (password.trim().length < 8) throw new Error('password lenght is smaller than 8 characters')

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    var xhr = new XMLHttpRequest

    xhr.open('POST', 'https://b00tc4mp.herokuapp.com/api/v2/users')

    xhr.addEventListener('load', function () {
        if (this.status === 409 || this.status === 400) {
            var res = JSON.parse(this.responseText)

            var error = res.error

            callback(new Error(error))
        } else if (this.status === 204) {
            callback(null)
        }

    })

    xhr.setRequestHeader('Content-type', 'application/json')

    var data = {}

    data.name = name
    data.username = username
    data.password = password

    var json = JSON.stringify(data)

    xhr.send(json)
}