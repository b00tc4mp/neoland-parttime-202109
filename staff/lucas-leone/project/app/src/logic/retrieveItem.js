import { validators, errors } from "commons";

const { validateToken, validateId } = validators
const { ClientError, ServerError } = errors


export default function (token,itemId) {
    validateToken(token)
    validateId(itemId, 'item id')

    return fetch(`http://localhost:8080/api/item/${itemId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
        .then(res => {
            const { status } = res
            if (status === 200)
                return res.json()
                    .then(item => { 
                        const {categories} = item
                        categories.forEach(category => {

                            category.id = category._id.toString()
            
                            delete category._id
                            delete category.__v
            
                        })

                        const {ingredients} = item
                        ingredients.forEach(ingredient => {

                            ingredient.id = ingredient._id.toString()
            
                            delete ingredient._id
                            delete ingredient.__v
            
                        })

                        const {allergens} = item
                        allergens.forEach(allergen => {

                            allergen.id = allergen._id.toString()
            
                            delete allergen._id
                            delete allergen.__v
            
                        })
                        
                        item.date = new Date(item.date)

                        return item
                    })
            else if (status >= 400 && status < 500)
                return res.json()
                    .then(payload => {
                        const { error: message } = payload

                        throw new ClientError(message)
                    })
            else if (status >= 500)
                return res.text()
                    .then(text => {
                        throw new ServerError(text)
                    })
        })
}