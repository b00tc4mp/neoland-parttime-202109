function registerUser(name, username, password, callback){

//ESTOS IF ES PARA EVITAR LLAMADAS AL SERVIDOR INUTILES, HAY QUE ASEGURARNOS QUE LOS DATOS QUE MANDEN SEAN CORECTOS, ANTES
//Así que vamos a validar campos: Input Validations

                                //el throw lanza una ejecución y no entra al Request
    if (typeof name !== 'string') throw new TypeError(name + ' is not string')
    if (!name.trim()) throw new Error('name is empty or blank')

    if (typeof username !== 'string') throw new TypeError(username + ' is not string')
    if (!username.trim()) throw new Error('username is empty or blank')

    if (typeof password !== 'string') throw new TypeError(password + ' is not string')
    if (!password.trim()) throw new Error('password is empty or blank')
    if (password.trim().length < 6) throw new Error('password length is smaller than 8 characters')

    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')

    var xhr = new XMLHttpRequest  
                                  
    xhr.open('POST','https://b00tc4mp.herokuapp.com/api/v2/users') 

    
    xhr.addEventListener('load', function(){        
        if(this.status === 400 || this.status === 409){                        
            var res = JSON.parse(this.responseText)       
            var error = res.error                         
            callback(new Error(error))                  
        } else if(this.status === 201) {           
            callback(null)                              
        }
    })
    
    xhr.setRequestHeader('Content-type', 'application/json') 
    
    var data = {}    

    data.name = name;
    data.username = username;
    data.password = password;

    var json = JSON.stringify(data) 

    xhr.send(json) 

}