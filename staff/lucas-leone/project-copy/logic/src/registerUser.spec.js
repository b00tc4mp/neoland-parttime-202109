require('dotenv').config()
const { mongoose: { connect, disconnect }, models: { Restaurant } } = require('data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const registerUser = require('./registerUser')
const { errors: { DuplicityError }} = require('commons')

const { env: { MONGODB_URL } } = process

describe('registerUser', () => {
    before(() => connect(MONGODB_URL))

    it('should succeed when user does not exist', () => {
        return Restaurant.deleteMany()
            .then(() => registerUser('lean leone', 'lean@leone.com', '12345678'))
            .then(() => Restaurant.findOne({ email: 'lean@leone.com' }))
            .then(restaurant => {
                expect(restaurant).to.exist
                expect(restaurant.username).to.equal('lean leone')
                expect(restaurant.email).to.equal('lean@leone.com')
               

                expect(bcrypt.compareSync('12345678', restaurant.password)).to.be.true
            })
    })

    it('should fail when user already exists', () => {
        return Restaurant.deleteMany()
            .then(() => {
                const hash = bcrypt.hashSync('12345678', 10)

                return Restaurant.create({ username: 'Ti Greton', email: 'ti@greton.com', password: hash })
            })
            .then(() => registerUser('Ti Greton', 'ti@greton.com', '12345678'))
            .then(() => {
                throw new Error('should not reach this point')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('user already exists')
            })
    })

    after(() => disconnect())
})