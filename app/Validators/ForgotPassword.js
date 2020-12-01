'use strict'

const Antl = use('Antl')

class ForgotPassword {
    get validateAll () {
        // Validates all fields before returning a message
        return true
    }

    get rules () {
        return {
            // validation rules
            email: 'required|email',
            required_url: 'required|url'
        }
    }

    get messages () {
        return Antl.list('validation')
    }
}

module.exports = ForgotPassword
