'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route
	.post('/users', 'UserController.store')
	.middleware(['recaptcha'])
	.validator('CreateUser')

Route
	.post('/session', 'SessionController.store')
	.middleware(['recaptcha'])
	.validator('CreateSession')


Route.group(() => {
	Route
		.post('/categories', 'CategoryController.store')
		.middleware('can:create_plugin')
		.validator('CreateCategory')
	Route
		.get('/categories', 'CategoryController.index')
})
	.middleware('auth:jwt');


Route.group(() => {
	Route
		.post('/auth/discord', 'DiscordOAuthController.store')
})