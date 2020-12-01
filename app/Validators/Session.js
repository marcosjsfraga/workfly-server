'use strict'

const Antl = use('Antl')

class Session {
    get validateAll () {
        // Validates all fields before returning a message
        return true
    }

    get rules () {
        return {
            // validation rules
            email: 'required|email|unique:users',
            password: 'required'
        }
    }

    get messages () {
        return Antl.list('validation')
    }
}

module.exports = Session
