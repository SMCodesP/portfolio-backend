'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('title', 45).notNullable()
      table.string('link', 220).notNullable()
      table.string('name', 30).notNullable()
      table.string('description', 220).notNullable()
      table.string('banner_url', 220).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CreateCategorySchema
