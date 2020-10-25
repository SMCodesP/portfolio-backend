'use strict'

class CreateCategory {
  get rules () {
    return {
			title: 'string|required',
			link: 'string|required',
			name: 'string|required'
		}
  }

  get messages() {
  	return {
  		'title.required': 'O título da categoria é obrigatório.',
  		'link.required': 'O link da categoria é obrigatório.',
  		'name.required': 'O nome da categoria é obrigatório.',
  	}
  }
}

module.exports = CreateCategory
