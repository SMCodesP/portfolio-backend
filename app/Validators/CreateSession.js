'use strict'

class CreateSession {
  get rules () {
		return {
		  username: 'string|required',
		  password: 'string|required'
		}
  }

  get messages() {
  	return {
      'username.required': 'O nome de usuário é obrigatório.',
      'username.string': 'O nome de usuário deve ser caractéres.',
      'password.required': 'Para logar-se é necessário enviar uma senha.',
      'password.string': 'A senha deve ser uma string.',
  	}
  }
}

module.exports = CreateSession
