'use strict'

class CreateProduct {
  get rules () {
    return {
      title: 'string|required',
      documentation_link: 'string|required',
      image_small: 'string|required',
      image_large: 'string|required',
      description: 'string|required',
      money: 'number|required',
      category_id: 'number|required',
    }
  }

  get messages() {
  	return {
      'title.required': 'O titulo do produto é obrigatório.',
      'title.string': 'O titulo do produto deve ser caractéres.',
      'documentation_link.required': 'O link da documentação do produto é obrigatório.',
      'documentation_link.string': 'O link da documentação do produto deve ser caractéres.',
      'image_small.required': 'O link da imagem pequena do produto é obrigatório.',
      'image_small.string': 'O link da imagem pequena do produto deve ser caractéres.',
      'image_large.required': 'O link da imagem grande do produto é obrigatório.',
      'image_large.string': 'O link da imagem grande do produto deve ser caractéres.',
      'description.required': 'A descrição do produto é obrigatório.',
      'description.string': 'A descrição do produto deve ser caractéres.',
      'money.required': 'O preço do produto é obrigatório.',
      'money.number': 'O preço do produto deve ser um número.',
      'category_id.required': 'O id da categoria que o produto pertence é obrigatório.',
      'category_id.number': 'O id da categoria que o produto pertence deve ser um número.',
  	}
  }
}

module.exports = CreateProduct
