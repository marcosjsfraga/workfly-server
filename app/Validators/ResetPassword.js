'use strict'

const Antl = use('Antl')

class ResetPassword {
    get validateAll () {
        // Validates all fields before returning a message
        return true
    }

    get rules () {
        return {
            // validation rules
            token: 'required',
            password_confirmation: 'required|confirmed'
        }
    }

    get messages () {
        return Antl.list('validation')
    }
}

module.exports = ResetPassword
