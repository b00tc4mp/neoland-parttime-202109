const { User } = require("data/src/models")

function retrieveUser(id){

    //TODO validations

    // findById
  /*   User.findById(id,(err, docs)=>{
        if(err) console.error(err)
        else{
            return docs
        }
    }) */

        return  User.findById(id)
        .then(doc => doc)
  



}

module.exports = retrieveUser