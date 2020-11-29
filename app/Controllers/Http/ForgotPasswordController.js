'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
    // Create token and send email
    async store ({ request, response }) {
        try {
            const email = request.input('email')
            const user = await User.findByOrFail('email', email)

            // Create the token
            user.token = crypto.randomBytes(10).toString('hex')
            // Set the create token time
            user.token_created_at = new Date()
            // Save user
            await user.save()

            // Send e-mail
            await Mail.send(
                ['emails.forgot_password'],
                {
                    email,
                    token: user.token,
                    link: `${request.input('redirect_url')}?token=${user.token}`
                },
                message => {
                    message
                        .to(user.email)
                        .from('marcosjsfraga@gmail.com', 'Marcos | Declabs')
                        .subject('Recuperação de senha')
                }
            )
        } catch (error) {
            console.log(`----= Send Email Error =----\n${error.message}\n----------------------------------`)
            return response
                .status(error.status)
                .send({ error: { message: 'Email não encontrado.' } })
        }
    }

    // Set new password to user
    async update ({ request, response }) {
        try {
            const { token, password } = request.all()

            const user = await User.findByOrFail('token', token)

            const tokenExpired = moment().subtract('2', 'days').isAfter(user.token_created_at)
            if (tokenExpired) {
                console.log('----= Password Reset Error =----\n\n----------------------------------')
                return response
                    .status(401)
                    .send({ error: { message: 'Token expirado.' } })
            }
            // -- Update User data
            user.token = null
            user.token_created_at = null
            user.password = password
            // Save user
            await user.save()
        } catch (error) {
            console.log(`----= Password Reset Error =----\n${error.message}\n----------------------------------`)
            return response
                .status(error.status)
                .send({ error: { message: 'Houve um problema ao resetar sua senha.' } })
        }
    }
}

module.exports = ForgotPasswordController
