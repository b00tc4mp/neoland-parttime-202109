require('dotenv').config()
const { mongoose: { connect, disconnect }, models: { Allergen, Restaurant } } = require('data')
const { expect } = require('chai')


const { errors: { NotFoundError } } = require('commons')
const retrieveAllergens = require('./retrieveAllergens')

const { env: { MONGODB_URL } } = process


describe('retrieveAllergens', () => {
    before(() => connect(MONGODB_URL))

    it('should succeed when  list is returned', () => {
        return Restaurant.deleteMany()

            .then(() => {
                const hash = bcrypt.hashSync('123456789', 10)
                Promise.all([
                    Allergen.create({ name: 'jamon' }),
                    Allergen.create({ name: 'queso' }),
                    Allergen.create({ name: 'harina' }),
                    Restaurant.create({ username: 'Segundo Luis', email: 'do@comp.do', password: hash })

                ])
                    .then((restaurant) => retrieveAllergens(restaurant.id))
                    .then(allergens => {

                        expect(allergens.length).to.equal(3)
                        expect(allergens[0].name).to.equal('jamon')
                        expect(allergens[1].name).to.equal('queso')
                        expect(allergens[2].name).to.equal('harina')

                    })
            })

    })


    after(() => disconnect())
})