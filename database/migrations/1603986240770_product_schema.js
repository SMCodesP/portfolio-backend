'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
	    table.string('title', 25)
	    table.string('documentation_link', 255)
	    table.string('image_small', 40)
	    table.string('image_large', 40)
	    table.text('description', 255)
	    table.decimal('money', 10, 2)
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
