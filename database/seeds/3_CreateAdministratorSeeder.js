'use strict'

/*
|--------------------------------------------------------------------------
| CreateAdministratorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role');
const Env = use('Env')

class CreateAdministratorSeeder {
  async run () {
  	const masterRole = await Role.findBy('slug', 'master')
    const user = await Factory.model('App/Models/User').create({
      username: 'admin',
      password: '5NY601Igh2$g5JREKF8@yJ5rw8',
    })
    await user.roles().attach([masterRole.id])
  }
}

module.exports = CreateAdministratorSeeder