var signupPanel = document.querySelector('.signup')
var postSignupPanel = document.querySelector('.post-signup')
var signinPanel = document.querySelector('.signin')
var levelPanel = document.querySelector('.level')
var gamePanel = document.querySelector('.game')

var _token

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

var signupForm = signupPanel.querySelector('form')

signupForm.addEventListener('submit', function (event) {
    event.preventDefault() //Para evitar que se recarge y perdamos lo que tenemos en memoria

    var nameInput = signupForm.name
    var usernameInput = signupForm.username
    var passwordInput = signupForm.password

    var name = nameInput.value
    var username = usernameInput.value
    var password = passwordInput.value

    // var user = {}

    // user.name = name
    // user.username = username
    // user.password = password

    // users.push(user)

    registerUser(name, username, password, function (error) {
        if (error) {
            alert(error.message)
            return
        }
        //Esto no puede pasar hasta que no compruebe si el usuario está o no registrado
        signupPanel.classList.add('off')
        postSignupPanel.classList.remove('off')
    })

})

var postSignupSigninButton = postSignupPanel.querySelector('button')

postSignupSigninButton.addEventListener('click', function () {
    postSignupPanel.classList.add('off')
    signinPanel.classList.remove('off')
})

var signinForm = signinPanel.querySelector('form')

signinForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var usernameInput = signinForm.username
    var passwordInput = signinForm.password

    var username = usernameInput.value
    var password = passwordInput.value

    authenticateUser(username, password, function (error, token) {
        if (error) {
            var signinFeedback = signinPanel.querySelector('.signin__feedback')

            signinFeedback.innerText = error.message

            signinFeedback.classList.remove('off')
        } else {
            retrieveUser(token, function (error, user) {
                if (error) {
                    var signinFeedback = signinPanel.querySelector('.signin__feedback')

                    signinFeedback.innerText = error.message

                    signinFeedback.classList.remove('off')

                    return
                }
                _token = token

                var levelUser = levelPanel.querySelector('.level__user')

                levelUser.innerText = 'Welcome ' + user.name + '!'

                signinPanel.classList.add('off')
                levelPanel.classList.remove('off')
            })
        }
    })
})


var levelOneButton = levelPanel.querySelector('.level--one')
levelOneButton.addEventListener('click', function () {
    levelPanel.classList.add('off')
    gamePanel.classList.remove('off')
    start()
})

//GAME LEVEL 1
function start(){
//Variables
var squareS = 50 // Medida lado cuadrado
var chipsS = 30
var cardY = 80
var squareX, squareY, chipsX, chipsY, kingX, kingY, queenX, queenY, jackX, jackY // coordenadas cuadrados
var speedX, speedY, kingSpeedX, kingSpeedY, queenSpeedX, queenSpeedY, jackSpeedX, jackSpeedY// Velocidades
var fps = 20
var step = 50
var points = 0
var gameOver = false

//Cargar canvas
var canvas = document.querySelector('.canvas')
var ctx = canvas.getContext('2d')

//Establecer el intervalo
setInterval(update, 300 / fps)

//Posiciones iniciales--estáticas
squareX = canvas.width / 2 //300
squareY = canvas.height / 2 //250
chipsX = 50
chipsY = 50
kingX = 100
kingY = 200
queenX = 600
queenY = 50
jackX = 350
jackY = 100

//Random starting speed
//Math.floor(Math.random() * (max - min + 1) + min)
//(min=25, max=100)
speedX = Math.floor(Math.random() * 76 + 25) / fps
speedY = Math.floor(Math.random() * 76 + 25) / fps
//(min=20, max=105)
kingSpeedX = Math.floor(Math.random() * 86 + 20) / fps
kingSpeedY = Math.floor(Math.random() * 86 + 20) / fps
//(min=30, max=110)
queenSpeedX = Math.floor(Math.random() * 81 + 30) / fps
queenSpeedY = Math.floor(Math.random() * 81 + 30) / fps
//(min=60, max=120)
jackSpeedX = Math.floor(Math.random() * 61 + 60) / fps
jackSpeedY = Math.floor(Math.random() * 61 + 60) / fps

//Random ball direction: tal y como lo teníamos sólo iba hacia la derecha-abajo. Ahora vamos a incluir el resto de direcciones
if (Math.floor(Math.random() * 2) == 0) {
    speedX = - speedX
}
if (Math.floor(Math.random() * 2) == 0) {
    speedY = - speedY
}
if (Math.floor(Math.random() * 3) == 0) {
    kingSpeedX = - kingSpeedX
}
if (Math.floor(Math.random() * 3) == 0) {
    kingSpeedY = - kingSpeedY
}
if (Math.floor(Math.random() * 3) == 0) {
    queenSpeedX = - queenSpeedX
}
if (Math.floor(Math.random() * 3) == 0) {
    queenSpeedY = - queenSpeedY
}
if (Math.floor(Math.random() * 3) == 0) {
    jackSpeedX = - jackSpeedX
}
if (Math.floor(Math.random() * 3) == 0) {
    jackSpeedY = - jackSpeedY
}

//Update function
function update() {
    // Hacemos que el elemento se mueva
    // squareX += speedX
    // squareY += speedY

    // kingX += kingSpeedX
    // kingY += kingSpeedY

    // queenX += queenSpeedX
    // queenY += queenSpeedY

    // jackX += jackSpeedX
    // jackY += jackSpeedY

    //Bounce the SQUARE off each wall
    if (squareX - squareS / 2 < 0 && speedX < 0) {
        speedX = - speedX
    }
    if (squareX + squareS / 2 > canvas.width && speedX > 0) {
        speedX = - speedX
    }
    if (squareY - squareS / 2 < 0 && speedY < 0) {
        speedY = - speedY
    }
    if (squareY + squareS / 2 > canvas.height && speedY > 0) {
        speedY = - speedY
    }
    //Bounce the KING off each wall
    if (kingX - squareS / 2 < 0 && kingSpeedX < 0) {
        kingSpeedX = - kingSpeedX
    }
    if (kingX + squareS / 2 > canvas.width && kingSpeedX > 0) {
        kingSpeedX = - kingSpeedX
    }
    if (kingY - cardY / 2 < 0 && kingSpeedY < 0) {
        kingSpeedY = - kingSpeedY
    }
    if (kingY + cardY / 2 > canvas.height && kingSpeedY > 0) {
        kingSpeedY = - kingSpeedY
    }
    //Bounce the QUEEN off each wall
    if (queenX - squareS / 2 < 0 && queenSpeedX < 0) {
        queenSpeedX = - queenSpeedX
    }
    if (queenX + squareS / 2 > canvas.width && queenSpeedX > 0) {
        queenSpeedX = - queenSpeedX
    }
    if (queenY - cardY / 2 < 0 && queenSpeedY < 0) {
        queenSpeedY = - queenSpeedY
    }
    if (queenY + cardY / 2 > canvas.height && queenSpeedY > 0) {
        queenSpeedY = - queenSpeedY
    }
    //Bounce the JACK off each wall
    if (jackX - squareS / 2 < 0 && jackSpeedX < 0) {
        jackSpeedX = - jackSpeedX
    }
    if (jackX + squareS / 2 > canvas.width && jackSpeedX > 0) {
        jackSpeedX = - jackSpeedX
    }
    if (jackY - cardY / 2 < 0 && jackSpeedY < 0) {
        jackSpeedY = - jackSpeedY
    }
    if (jackY + cardY / 2 > canvas.height && jackSpeedY > 0) {
        jackSpeedY = - jackSpeedY
    }

    //Draw background, square and cards
    ctx.fillStyle = 'seagreen'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'red'
    ctx.fillRect(squareX - squareS / 2, squareY - squareS / 2, squareS, squareS)

    var imageKing = document.querySelector('.king')
    ctx.drawImage(imageKing, kingX - squareS / 2, kingY - cardY / 2, squareS, cardY)

    var imageQueen = document.querySelector('.queen')
    ctx.drawImage(imageQueen, queenX - squareS / 2, queenY - cardY / 2, squareS, cardY)

    var imageJack = document.querySelector('.jack')
    ctx.drawImage(imageJack, jackX - squareS / 2, jackY - cardY / 2, squareS, cardY)

    var imageChips = document.querySelector('.chips')
    ctx.drawImage(imageChips, chipsX - squareS / 2, chipsY - squareS / 2, squareS, squareS)

    text('Points: ' + points, '40px Share Tech Mono', 290, 40, 'black') //Score 
    if (gameOver) {
        //si points = -1, que me salga el texto:GAME OVER, que la puntuación = 0 y squares//player se queden en sus posiciones iniciales y sin velocidad
        text('GAME OVER', '120px Share Tech Mono', 100, 350,'navy')
        //Squares: vuelven a sus coordenadas iniciales
        squareX = canvas.width / 2 //300
        squareY = canvas.height / 2 //250
        chipsX = 50
        chipsY = 50
        kingX = 100
        kingY = 200
        queenX = 600
        queenY = 50
        jackX = 350
        jackY = 100
        points = 0
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight')
        chipsX += step
    if (event.key === 'ArrowLeft')
        chipsX -= step
    if (event.key === 'ArrowDown')
        chipsY += step
    if (event.key === 'ArrowUp')
        chipsY -= step

    //El rey es el único que suma puntos
    if (chipsX + squareS >= kingX
        && chipsX <= kingX + squareS
        && chipsY + squareS >= kingY
        && chipsY <= kingY + squareS) {
        points++
        if (points == -1) {
            return gameOver = true
        }
        // console.log('Congratulations!! You have ' + points + ' points')
    }
    if (chipsX + squareS >= squareX
        && chipsX <= squareX + squareS
        && chipsY + squareS >= squareY
        && chipsY <= squareY + squareS) {
        points--
        if (points == -1) {
            return gameOver = true
        }
        //console.log('Sorry!! You have ' + points + ' points')
    }
    if (chipsX + squareS >= queenX
        && chipsX <= queenX + squareS
        && chipsY + squareS >= queenY
        && chipsY <= queenY + squareS) {
        points--
        if (points == -1) {
            return gameOver = true
        }
        // console.log('Congratulations!! You have ' + points + ' points')
    }
    if (chipsX + squareS >= jackX
        && chipsX <= jackX + squareS
        && chipsY + squareS >= jackY
        && chipsY <= jackY + squareS) {
        points--
        if (points == -1) {
            return gameOver = true
        }
        // console.log('Congratulations!! You have ' + points + ' points')
    }

})

//Score and game over
function text(txt, fnt, x, y, c) {
    ctx.fillStyle = c
    ctx.font = fnt
    ctx.fillText(txt, x, y)
}

//FIN DEL JUEGO

}


//Volver a jugar-- CLICK BOTÓN Play Again
// var auxiliarBar = gamePanel.querySelector('.auxiliar')
// var restartGameButton = auxiliarBar.querySelector('.restart')
// restartGameButton.addEventListener('click', restartGame)
// function restartGame(){
//     // location.reload()--carga toda la página, desde el panel Sign up
//     start()
    
// }


//Más paneles
var auxiliarBar = gamePanel.querySelector('.auxiliar')
var changeButton = auxiliarBar.querySelector('.auxiliar__change')
changeButton.addEventListener('click', function () {
    gamePanel.classList.add('off')
    levelPanel.classList.remove('off')
})

var exitButton = auxiliarBar.querySelector('.auxiliar__exit')
var lastExitPanel = document.querySelector('.exit')
exitButton.addEventListener('click', function () {
    gamePanel.classList.add('off')
    lastExitPanel.classList.remove('off')
})

var backGameButton = lastExitPanel.querySelector('.button--back')
backGameButton.addEventListener('click', function () {
    lastExitPanel.classList.add('off')
    gamePanel.classList.remove('off')
})

var lastExitButton = lastExitPanel.querySelector('.button--exit')
lastExitButton.addEventListener('click', function () {
    lastExitPanel.classList.add('off')
    signupPanel.classList.remove('off')
})