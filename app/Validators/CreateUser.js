'use strict'

class CreateUser {
	get rules () {
		return {
			email: 'required|email|unique:users',
			username: `required|string|min:4|unique:users`,
			password: `required|string|min:6`,
			confirm_password: `required|string|min:6|same:password`,
		}
	}

  get messages () {
    return {
      'email.required': 'Para fazer o registro é necessário o e-mail.',
      'email.email': 'Para fazer o registro é necessário um e-mail válido.',
      'email.unique': 'Esse e-mail já está registrado.',
      'password.required': 'Para registrar-se é necessário enviar uma senha.',
      'password.min': `A senha digitada é muito pequena.`,
      'username.required': 'O nome de usuário é obrigatório.',
      'username.string': 'O nome de usuário deve ser caractéres.',
      'username.unique': 'Já existe um usuário com esse nome.',
      'username.min': `O nome digitado é muito pequeno`,
      'confirm_password.required': 'Para registrar-se é necessário enviar uma confirmação de sua senha.',
      'confirm_password.min': `A confirmação de senha digitada é muito pequena.`,
      'confirm_password.same': `A confirmação de senha deve ser igual a senha digitada.`,
    }
  }
}

module.exports = CreateUser
