'use strict'

const Category = use("App/Models/Category")

class ProductCategoryController {

	async store({ request, auth }) { 
		const data = request.only(["title", "link", "name"])

		const response = await Category.create(data)

		return response
	}

}

module.exports = ProductCategoryController
