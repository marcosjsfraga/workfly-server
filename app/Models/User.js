'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
    // Constructor
    static boot () {
        super.boot()

        // Method executed before save
        this.addHook('beforeSave', async (userInstance) => {
            if (userInstance.dirty.password) {
                userInstance.password = await Hash.make(userInstance.password)
            }
        })
    }

    // BEGIN:FK configurations
    tokens () {
        return this.hasMany('App/Models/Token')
    }

    projects () {
        return this.hasMany('App/Models/Project')
    }

    tasks () {
        return this.hasMany('App/Models/Task')
    }
    // END:FK configurations
}

module.exports = User
