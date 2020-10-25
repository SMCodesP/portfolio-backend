'use strict'

class SessionController {

	async store({ request, auth }) { 
    const { username, password } = request.all()

    try {
    	const token = await auth.attempt(username, password)
   	
   		return token
    } catch (error) {
    	throw new Error('Usuário ou senha inválida!')
    }

	}

}

module.exports = SessionController
