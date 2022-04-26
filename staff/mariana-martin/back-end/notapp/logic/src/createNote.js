//importo de la dependencia de data los modelos y luego el modelo Note
const { models: { User, Note }} = require('data')

function createNote(userId, text, color, public=false ){

    //Validations

    return User.findById(userId)  //busco user
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)

            return Note.create({ user: userId, text, color, public}) 
        })
        .then(note => { })

}

module.exports = createNote