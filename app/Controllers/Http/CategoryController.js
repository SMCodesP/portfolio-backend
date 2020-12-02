'use strict'

const Category = use("App/Models/Category")

class ProductCategoryController {
	
	async store({ request }) { 
		const data = request.only(["title", "link", "name", "description", "banner_url"])
		
		const response = await Category.create(data)
		
		return response
	}
	
	async index({ request }) {
		const id = request.input('id')
		const link = request.input('link')
		const all = request.input('all')
		
		if (id) {
			let category = await Category.findOrFail(id)
			
			if (all) {
				await category.load('products')
			}
			
			return category
		} else {

			if (link) {
				let category = (all)
					? await Category
						.query()
						.with('products')
						.where('link', link)
						.first()
					: await Category
						.query()
						.where('link', link)
						.first()

				console.log(category)

				return category || []
			} else {
				let categories = (all) ? await Category
					.query()
					.with('products')
					.fetch() : await Category.all()
					
				return categories
			}
		}
	}
	
}

module.exports = ProductCategoryController
