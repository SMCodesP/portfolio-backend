'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Env = use('Env')

// Role blueprint
Factory.blueprint('Adonis/Acl/Role', (faker, i, data) => {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description
  };
});

// Permission blueprint
Factory.blueprint('Adonis/Acl/Permission', (faker, i, data) => {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description
  };
});

Factory.blueprint('App/Models/User', (faker, i, data) => {
  return data;
});
