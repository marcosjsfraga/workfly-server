'use strict'

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
}

module.exports = ForgotPassword