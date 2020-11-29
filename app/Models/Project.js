'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
    // BEGIN:FK configurations
    user () {
        return this.belongsTo('App/Models/User')
    }

    tasks () {
        return this.hasMany('App/Models/Task')
    }
    // END:FK configurations
}

module.exports = Project
