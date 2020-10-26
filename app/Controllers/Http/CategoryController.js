'use strict'

const Redis = use('Redis')
const Category = use("App/Models/Category")

class ProductCategoryController {

	async store({ request }) { 
		const data = request.only(["title", "link", "name"])

		const response = await Category.create(data)

    await Redis.set(`categories:${response.id}`, JSON.stringify(response))

		return response
	}

	async index({ request }) { 
		const id = request.input('id')

		if (id) {
			const category = await Category.findBy('id', id)

			await Redis.set(`categories:${id}`, JSON.stringify(category))

			return category
		} else {
			const keys = await Redis.keys('categories:*')
			let categoriesCached = keys.map(async (name) => JSON.parse(await Redis.get(name)))
			console.log(categoriesCached)

			categoriesCached = await Promise.all(categoriesCached)

			let categories = (categoriesCached > 0) ? categoriesCached : await (async () => {
				let categoriesForceCache = await Category.all()

				categoriesForceCache.toJSON().map(async (category) => {
					await Redis.set(`categories:${category.id}`, JSON.stringify(category))
				})
				return categoriesForceCache.toJSON()
			})();

			return categories
		}
	}

}

module.exports = ProductCategoryController
