const authenticateUser = require('./authenticateUser')

require('dotenv').config()
const { mongoose: { connect, disconnect }, models: { User } } = require('data')

const bcrypt = require('bcryptjs')
const { errors: { AuthError } } = require('commons')

const { env: { MONGODB_URL } } = process

describe('authenticateUser', () => {
    beforeAll(() => connect(MONGODB_URL))

    test('should succeed when user already exists and credentials are correct', () => {
        return User.deleteMany()
            .then(() => {
                const hash = bcrypt.hashSync('12345678', 10)

                return User.create({ nickname: 'lola', email: 'lola@gmail.com', password: hash })
            })
            .then(() => authenticateUser('lola@gmail.com', '12345678'))
            .then(userId => {
                expect(userId).toBeDefined()
                expect(typeof userId).toBe('string')

                return User.findOne({ email: 'lola@gmail.com' })
                    .then(user => {
                        expect(user.id).toEqual(userId)
                    })
            })
    })

    // test('should fail when user does not exist', () => {
    //     return User.deleteMany()
    //         .then(() => authenticateUser('lola@gmail.com', '12345678'))
    //         .then(() => {
    //             throw new Error('should not reach this point')
    //         })
    //         .catch(error => {
    //             expect(error).to.exist
    //             expect(error).toBe.instanceOf(AuthError)
    //             expect(error.message).toEqual('wrong credentials')
    //         })
    // })

    // test('should fail when user already exists and email is wrong', () => {
    //     return User.deleteMany()
    //         .then(() => {
    //             const hash = bcrypt.hashSync('12345678', 10)

    //             return User.create({ nickname: 'lola', email: 'lola@gmail.com', password: hash })
    //         })
    //         .then(() => authenticateUser('wrong-' + 'lola@gmail.com', '12345678'))
    //         .then(() => {
    //             throw new Error('should not reach this point')
    //         })
    //         .catch(error => {
    //             expect(error).to.exist
    //             expect(error).toBe.instanceOf(AuthError)
    //             expect(error.message).toEqual('wrong credentials')
    //         })
    // })

    // test('should fail when user already exists and password is wrong', () => {
    //     return User.deleteMany()
    //         .then(() => {
    //             const hash = bcrypt.hashSync('12345678', 10)

    //             return User.create({ nickname: 'lola', email: 'lola@gmail.com', password: hash })
    //         })
    //         .then(() => authenticateUser('lola@gmail.com', '12345678' + '-wrong'))
    //         .then(() => {
    //             throw new Error('should not reach this point')
    //         })
    //         .catch(error => {
    //             expect(error).to.exist
    //             expect(error).toBe.instanceOf(AuthError)
    //             expect(error.message).toEqual('wrong credentials')
    //         })
    // })

    afterAll(() => disconnect())
})