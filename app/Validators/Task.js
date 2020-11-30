'use strict'

class Task {
    get validateAll () {
        // Validates all fields before returning a message
        return true
    }

    get rules () {
        return {
            // validation rules
            title: 'required',
            due_date: 'date'
        }
    }
}

module.exports = Task
