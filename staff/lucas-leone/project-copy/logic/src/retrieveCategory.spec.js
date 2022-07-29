require('dotenv').config()
const { mongoose: { connect, disconnect }, models: {Ingredients, Restaurant } } = require('data')
const { expect } = require('chai')


const { errors: { NotFoundError } } = require('commons')
const retrieveIngredients = require('./retrieveAllergens')

const { env: { MONGODB_URL } } = process


describe('retrieveAllergens', () => {
    before(() => connect(MONGODB_URL))

    it('should succeed when  list is returned', () => {
        return Restaurant.deleteMany()

            .then(() => {
                const hash = bcrypt.hashSync('123456789', 10)
                Promise.all([
                    Ingredient.create({ name: 'jamon' }),
                    Ingredient.create({ name: 'queso' }),
                    Ingredient.create({ name: 'harina' }),
                    Restaurant.create({ username: 'Segundo Luis', email: 'do@comp.do', password: hash })

                ])
                    .then((restaurant) => retrieveIngredients(restaurant.id))
                    .then(ingredients => {

                        expect(ingredients.length).to.equal(3)
                        expect(ingredients[0].name).to.equal('jamon')
                        expect(ingredients[1].name).to.equal('queso')
                        expect(ingredients[2].name).to.equal('harina')

                    })
            })

    })


    after(() => disconnect())
})