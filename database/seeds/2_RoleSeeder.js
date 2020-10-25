'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Permission = use('Permission');

class RoleSeeder {
  async run () {
  	/*
    |--------------------------------------------------------------------------
    | Get all permission
    |--------------------------------------------------------------------------
    */

		const permissions = {
			givePlugin: await Permission.findBy('slug', 'give_plugin'),
			removePlugin: await Permission.findBy('slug', 'remove_plugin'),
			createPlugin: await Permission.findBy('slug', 'create_plugin'),
			deletePlugin: await Permission.findBy('slug', 'delete_plugin'),
			updatePlugin: await Permission.findBy('slug', 'update_plugin'),
			viewTickets: await Permission.findBy('slug', 'view_tickets'),
			answerTicket: await Permission.findBy('slug', 'answer_tickets'),
			closeTicket: await Permission.findBy('slug', 'close_tickets'),
		}

		const permissionsList = Object.values(permissions).map((permission) => permission.id)

  	/*
    |--------------------------------------------------------------------------
    | Create Roles
    |--------------------------------------------------------------------------
    */

  	const masterRole = await Factory.model('Adonis/Acl/Role').create({
	    slug: 'master',
	    name: 'Master'
    })

    const administratorRole = await Factory.model('Adonis/Acl/Role').create({
	    slug: 'administrator',
	    name: 'Administrador'
    })

    const moderatorRole = await Factory.model('Adonis/Acl/Role').create({
	    slug: 'moderator',
	    name: 'Moderador'
    })

    const helperRole = await Factory.model('Adonis/Acl/Role').create({
	    slug: 'helper',
	    name: 'Ajudante'
    })

		/*
    |--------------------------------------------------------------------------
    | Add permissions in roles
    |--------------------------------------------------------------------------
    */

		await masterRole
			.permissions()
			.attach(permissionsList);

		await administratorRole
			.permissions()
			.attach(permissionsList);

		await moderatorRole
			.permissions()
			.attach([
				permissions['givePlugin'].id,
				permissions['removePlugin'].id,
				permissions['viewTickets'].id,
				permissions['answerTicket'].id,
				permissions['closeTicket'].id,
			]);

		await moderatorRole
			.permissions()
			.attach([
				permissions['viewTickets'].id,
				permissions['answerTicket'].id,
				permissions['closeTicket'].id,
			]);		
  }
}

module.exports = RoleSeeder
