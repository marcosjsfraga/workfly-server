'use strict'

const Antl = use('Antl')

class Project {
    get validateAll () {
        // Validates all fields before returning a message
        return true
    }

    get rules () {
        return {
            // validation rules
            title: 'required',
            description: 'required'
        }
    }

    get messages () {
        return Antl.list('validation')
    }
}

module.exports = Project
