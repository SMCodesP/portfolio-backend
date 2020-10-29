'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FriendSchema extends Schema {
  up () {
    this.create('friends', (table) => {
      table.increments()
    	table.boolean('permission_read_item')
    	table.boolean('permission_write_item')
    	table.boolean('permission_read_license')
    	table.boolean('permission_write_license')
    	table.boolean('permission_read_config')
    	table.boolean('permission_write_config')
      table.integer('user_id').unsigned().index()
      table.foreign('user_id').references('id').on('users').onDelete('cascade')
      table.integer('friend_id').unsigned().index()
      table.foreign('friend_id').references('id').on('users').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('friends')
  }
}

module.exports = FriendSchema
