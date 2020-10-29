'use strict'

const Env = use('Env')

class DiscordOAuthController {

	async store({ request, ally }) {
		console.log(request)
	}

	async index({ ally, response }) {
		const discord = ally.driver('discord')

	  try {
	    const user = await discord.getUser()

	    const json = user.toJSON()

	    response.redirect(`${Env.get('FRONT_END')}/auth/discord?token=${json.accessToken}`);
	  } catch (error) {
	    console.error(error)
	    return error
	  }
	}

}

module.exports = DiscordOAuthController
