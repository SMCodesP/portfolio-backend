'use strict'

class CreateCategory {
  get rules () {
    return {
			title: 'string|required',
			link: 'string|required',
      name: 'string|required',
      description: 'string|required',
			banner_url: 'string|required',
		}
  }

  get messages() {
  	return {
  		'title.required': 'O título da categoria é obrigatório.',
  		'link.required': 'O link da categoria é obrigatório.',
      'name.required': 'O nome da categoria é obrigatório.',
      'description.required': 'A descrição da categoria é obrigatório.',
  		'banner.required': 'O banner da categoria é obrigatório.',
  	}
  }
}

module.exports = CreateCategory
