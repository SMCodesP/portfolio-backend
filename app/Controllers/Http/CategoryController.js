'use strict'

const Redis = use('Redis')
const Category = use("App/Models/Category")

class ProductCategoryController {
	
	async store({ request }) { 
		const data = request.only(["title", "link", "name"])
		
		const response = await Category.create(data)
		
		return response
	}
	
	async index({ request }) {
		const id = request.input('id')
		const all = request.input('all')
		
		if (id) {
			const category = await Category.findOrFail(id)
			
			if (all) {
				await category.load('products')
			}
			
			return category
		} else {

			let categories = (all) ? await Category
				.query()
				.with('products')
				.fetch() : await Category.all()
				
			return categories
		}
	}
	
}

module.exports = ProductCategoryController
