var signupPanel = document.querySelector('.signup')
var postSignupPanel = document.querySelector('.post-signup')
var signinPanel = document.querySelector('.signin')
var homePanel = document.querySelector('.home') //panel de boton Game y Profile
var gamePanel = document.querySelector('.game') //el juego
var profilePanel = document.querySelector('.profile') //Profile, change user and psw
var changeUsernamePanel = document.querySelector('.change-username')
var changePasswordPanel = document.querySelector('.change-password')
var spinner = document.querySelector('.spinner')


var _token

///////////////// FORMULARIO DE SIGN IN

var signupSigninButton = signupPanel.querySelector('.signup__signin')

signupSigninButton.addEventListener('click', function () {
    signupPanel.classList.add('off')
    signinPanel.classList.remove('off')
})

var signinSignupButton = signinPanel.querySelector('.signin__signup')

signinSignupButton.addEventListener('click', function () {
    signinPanel.classList.add('off')
    signupPanel.classList.remove('off')
})

///////////////// FORMULARIO DE SIGN UP

var signupForm = signupPanel.querySelector('form')

signupForm.addEventListener('submit', function (event) {
    event.preventDefault()

    spinner.classList.remove('off')


    var nameInput = signupForm.name
    var usernameInput = signupForm.username
    var passwordInput = signupForm.password

    var name = nameInput.value
    var username = usernameInput.value
    var password = passwordInput.value

    try {
        registerUser(name, username, password, function (error) {
            if (error) {

                spinner.classList.add('off')


                var signupFeedback = signupPanel.querySelector('.signup__feedback')

                signupFeedback.innerText = error.message

                signupFeedback.classList.remove('off')

                return
            }

            spinner.classList.add('off')

            signupPanel.classList.add('off')
            postSignupPanel.classList.remove('off')
        })
        
    } catch (error) {

        spinner.classList.add('off')

        var signupFeedback = signupPanel.querySelector('.signup__feedback')

        signupFeedback.innerText = error.message

        signupFeedback.classList.remove('off')
    }
})

///////////////// BOTÓN SIGN IN / UP
var postSignupSigninButton = postSignupPanel.querySelector('button')

postSignupSigninButton.addEventListener('click', function () {
    postSignupPanel.classList.add('off')
    signinPanel.classList.remove('off')
})

var signinForm = signinPanel.querySelector('form')

var signInUsernameInput = signinForm.username

signInUsernameInput.onfocus = function () {
    var signinFeedback = signinPanel.querySelector('.feedback')

   // signinFeedback.classList.add('off')
}

var signInPasswordInput = signinForm.password

signInPasswordInput.onfocus = function () {
    var signinFeedback = signinPanel.querySelector('.feedback')

    //signinFeedback.classList.add('off')
}

signinForm.addEventListener('submit', function (event) {
event.preventDefault()

spinner.classList.remove('off')

var usernameInput = signinForm.username
var passwordInput = signinForm.password

var username = usernameInput.value
 var password = passwordInput.value

    //LLAMAR A LA LÓGICA AUTHENTICATE

    try {
        authenticateUser(username, password, function (error, token) {
        if (error) {

            spinner.classList.add('off')


                var signinFeedback = signinPanel.querySelector('.feedback')

                signinFeedback.innerText = error.message
                signinFeedback.classList.remove('feedback--warning')
                signinFeedback.classList.add('feedback--error')

                signinFeedback.classList.remove('off')

        return
        }
            //LLAMAR A LA LÓGICA RETRIEVE

            retrieveUser(token, function (error, user) {
            if (error) {

                spinner.classList.add('off')

                    var signinFeedback = signinPanel.querySelector('.signin__feedback')

                    signinFeedback.innerText = error.message

                    signinFeedback.classList.remove('off')

            return
            }

            spinner.classList.add('off')

                _token = token

                var homeUser = homePanel.querySelector('.home__user')

                homeUser.innerText = 'Helloooooo, ' + user.name + '!!!!!'

                signinPanel.classList.add('off')
                homePanel.classList.remove('off')

                start()
        })
    })
    } catch (error) {

        spinner.classList.add('off')

        var signinFeedback = signinPanel.querySelector('.feedback')

    signinFeedback.innerText = error.message
     signinFeedback.classList.remove('feedback--error')
     signinFeedback.classList.add('feedback--warning')

    signinFeedback.classList.remove('off')
    }
})

///////////////// HOME PROFILE los dos botones de Game y Profile


var homeGameButton = document.querySelector('.home__game')//Botón de Game

homeGameButton.onclick = function () {
    profilePanel.classList.add('off')
    gamePanel.classList.remove('off') // enciendo game
    homePanel.classList.add('off') //apagar home 
}

var homeProfileButton = document.querySelector('.home__profile')//Botón de Profile


homeProfileButton.onclick = function () {
    gamePanel.classList.add('off')
    changeUsernamePanel.classList.add('off')
    changePasswordPanel.classList.add('off')
    profilePanel.classList.remove('off') // aquí enciendo el panel profile
    homePanel.classList.add('off') //aquí apago el panel home

}

///////////////// CAMBIAR USERNAME

var profileChangeUsernameButton = profilePanel.querySelector('.profile__change-username')

profileChangeUsernameButton.onclick = function () {
     profilePanel.classList.add('off')
     changeUsernamePanel.classList.remove('off')

}

///////////////// CAMBIAR PASSWORD 

var profileChangePasswordButton = profilePanel.querySelector('.profile__change-password')

profileChangePasswordButton.onclick = function () {
   profilePanel.classList.add('off')
    changePasswordPanel.classList.remove('off')
}

var changeUsernameForm = changeUsernamePanel.querySelector('form')

var changeUsernameUsernameInput = changeUsernameForm.username

changeUsernameUsernameInput.onfocus = function () {
    var changeUsernameFeedback = changeUsernamePanel.querySelector('.feedback')

    changeUsernameFeedback.classList.add('off')
}

///////////////// CAMBIAR FORMA 
changeUsernameForm.onsubmit = function (event) {
    event.preventDefault()


    var usernameInput = this.username

    var username = usernameInput.value

    var data = { username: username }

    try {
        modifyUser(_token, data, function (error) {
            var changeUsernameFeedback = changeUsernamePanel.querySelector('.feedback')

            if (error) {
                changeUsernameFeedback.innerText = error.message
                changeUsernameFeedback.classList.remove('feedback--success')
                changeUsernameFeedback.classList.add('feedback--error')

                changeUsernameFeedback.classList.remove('off')

                return
            }

            changeUsernameFeedback.innerText = 'Username correctly updated'
            changeUsernameFeedback.classList.add('feedback--success')

            changeUsernameFeedback.classList.remove('off')
        })
    } catch (error) {
        var changeUsernameFeedback = changeUsernamePanel.querySelector('.feedback')

        changeUsernameFeedback.innerText = error.message
        changeUsernameFeedback.classList.remove('feedback--success')
        changeUsernameFeedback.classList.add('feedback--error')

        changeUsernameFeedback.classList.remove('off')
    }
}
     
//****  esto agregue nuevo:
var homeButtonProfile = document.querySelector('.home_button')
homeButtonProfile.classList.remove('off')
      

///////////////// EMPIEZA EL JUEGO 

function start() {

    
       
    
    //**** Frutas ****

    //pera
    var pear = document.querySelector('.pear')
    pear.draggable = true  //se selecciona el elemento y se hace draggable

    pear.addEventListener('dragstart', function (event) {  //se agrega un evento a la variable pera con dragstart
        event.dataTransfer.setData('id', 'pear')            //al evento se agrega método setData 
    })

    //cerezas
    var cherries = document.querySelector('.cherries')
    cherries.draggable = true

    cherries.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'cherries')
    })

    //coco
    var coco = document.querySelector('.coco')
    coco.draggable = true

    coco.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'coco')
    })

    //piña
    var pineapple = document.querySelector('.pineapple')
    pineapple.draggable = true

    pineapple.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'pineapple')
    })

    //naranja
    var orange = document.querySelector('.orange')
    orange.draggable = true

    orange.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'orange')
    })

    //manzana
    var apple = document.querySelector('.apple')
    apple.draggable = true

    apple.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'apple')
    })

    //durazno
    var peach = document.querySelector('.peach')
    peach.draggable = true

    peach.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('id', 'peach')
    })


    //**** Licuadora ****
    
    var blender = document.querySelector('.blender');

    blender.addEventListener('dragover', function (event) {
        event.preventDefault()
    })

    blender.addEventListener('drop', function (event) {
        var id = event.dataTransfer.getData('id')

        //drop de frutas

        if (id === 'pear')
            blender.append(pear)

        if (id === 'cherries')
            blender.append(cherries)

        if (id === 'coco')
            blender.append(coco)

        if (id === 'pineapple')
            blender.append(pineapple)

        if (id === 'orange')
            blender.append(orange)

        if (id === 'apple')
            blender.append(apple)

        if (id === 'peach')
            blender.append(peach)

    })

    var smoothie = document.querySelector('.blender-smoothie-off');

    blender.addEventListener('click', function () {
        document.querySelector('.title').style.color = '#FA8072'
        document.querySelector('.title').innerHTML = 'Ready to Drink!!!!!';
        smoothie.style.display = 'inline'
        blender.style.display = 'none'

    })

    

}