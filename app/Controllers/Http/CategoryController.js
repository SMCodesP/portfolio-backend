'use strict'

const Redis = use('Redis')
const Category = use("App/Models/Category")

class ProductCategoryController {

	async store({ request }) { 
		const data = request.only(["title", "link", "name"])

		const response = await Category.create(data)

		const cachedCategories = await Redis.get('users')
    if (cachedCategories) {
      const cachedCategoriesParsed = JSON.parse(cachedCategories)
      cachedCategoriesParsed.push(response)
      await Redis.set('categories', JSON.stringify(cachedCategoriesParsed))
    } else {
    	const allCategories = await Category.all()

    	await Redis.set('categories', JSON.stringify(allCategories))
    }

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
			const cache = (all) ? 'categories_all' : 'categories'
			const categoriesCached = await Redis.get(cache)

			const categoriesCachedParsed = JSON.parse(categoriesCached)

			let categories = (categoriesCachedParsed && (categoriesCachedParsed.length || 0 > 0)) ? categoriesCachedParsed : await (async () => {
				let categoriesForceCache = (all) ? await Category
					.query()
					.with('products')
					.fetch() : await Category.all()

				await Redis.set(cache, JSON.stringify(categoriesForceCache))

				return categoriesForceCache.toJSON()
			})();

			return categories
		}
	}

}

module.exports = ProductCategoryController
