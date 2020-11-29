'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
    up () {
        this.create('files', (table) => {
            table.increments()
            table.string('file_name').notNullable().unique()
            table.string('original_name').notNullable().unique()
            table.string('type', 20)
            table.string('subtype', 20)
            table.timestamps()
        })
    }

    down () {
        this.drop('files')
    }
}

module.exports = FileSchema
