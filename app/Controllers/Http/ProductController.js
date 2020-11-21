'use strict'

const Redis = use('Redis')
const Product = use("App/Models/Product")

class ProductController {

	async store({ request }) {

		const data = request.only([
			"title",
			"documentation_link",
			"image_small",
			"image_large",
			"description",
			"money",
			"category_id"
		])

		const response = await Product.create(data)

		await response.load('category')

		return response
	}

	async index({ request }) {
		const id = request.input('id')
		const all = request.input('all')

		if (id) {

		} else {
			const products = (all) ? await Product
			.query()
			.with('category')
			.fetch() : await Product.all()

			return products
		}
	}

}

module.exports = ProductController
