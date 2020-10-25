'use strict'

/*
|--------------------------------------------------------------------------
| AclSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AclSeeder {
	async run () {
		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'give_plugin',
			name: 'Give plugins',
			description: 'Give player a plugin'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'remove_plugin',
			name: 'Remove plugins',
			description: 'Remove player a plugin'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'create_plugin',
			name: 'Create plugin',
			description: 'Create new plugin'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'delete_plugin',
			name: 'Delete plugin',
			description: 'Delete a plugin'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'update_plugin',
			name: 'Update plugin',
			description: 'Update a plugin'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'view_tickets',
			name: 'View ticket',
			description: 'View all tickets'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'answer_tickets',
			name: 'Answer ticket',
			description: 'Answer a ticket'
		});

		await Factory.model('Adonis/Acl/Permission').create({
			slug: 'close_tickets',
			name: 'Close ticket',
			description: 'Close a ticket'
		});
	}
}

module.exports = AclSeeder
