const registerUser = require('./registerUser')

require('dotenv').config()
const { mongoose: { connect, disconnect }, models: { User } } = require('data')
const { expect } = require('chai')
const bcrypt = require('bcryptjs')
const { errors: { DuplicityError } } = require('commons')

const { env: { MONGODB_URL } } = process

describe('registerUser', () => {
    before(() => connect(MONGODB_URL))

    it('should suceed when user doesnt exist', () => {
        debugger
        return User.deleteMany()
            .then(() => registerUser('lola', 'lola@gmail.com', '12345678')
            )
            .then(() => User.findOne({ email: 'lola@gmail.com' })
            )
            .then(user => {
                expect(user).to.exist
                expect(user.nickname).to.equal('lola')
                expect(user.email).to.equal('lola@gmail.com')
                expect(bcrypt.compareSync('12345678', user.password)).to.be.true
            })
    })
    it('should fail when user already exist', () => {
        return User.deleteMany()
            .then(() => {
                const hash = bcrypt.hashSync('12345678')

                return User.create({ nickname: 'lola', email: 'lola@gmail.com', password: hash })
            })
            .then(() => {
                registerUser('lola', 'lola@gmail.com', '12345678')
            })
            .catch(error => {
                expect(error).to.exist
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal('duplicate nickname')
            })
    })

    after(() => disconnect())
})