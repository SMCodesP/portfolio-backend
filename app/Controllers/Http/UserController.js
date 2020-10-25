'use strict'

const User = use("App/Models/User")

class UserController {

	async store ({ request, auth }) {
		const data = request.only(["username", "email", "password"])

		const user = await User.create(data)

		user.password = undefined

		const jwt = await auth.generate(user)

		return {
			user,
			jwt
		}
	}

}

module.exports = UserController
