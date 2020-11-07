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

		await Redis.set(`products:${response.id}`, JSON.stringify(response))
		await response.load('category')
		await Redis.set(`products_all:${response.id}`, JSON.stringify(response))

		return response
	}

	async index({ request }) {
		const id = request.input('id')
		const all = request.input('all')

		if (id) {

		} else {
			let products;
			const cache = (all) ? 'products_all' : 'products'

			const keys = await Redis.keys(`${cache}:*`)
			let productsCacheParsed = keys.map(async (name) => JSON.parse(await Redis.get(name)))

			productsCacheParsed = await Promise.all(productsCacheParsed)

			if (productsCacheParsed.length > 0) {
				products = productsCacheParsed
			} else {
				products = await this.createCache(all, cache)				
			}

			return products
		}
	}

	async addCache(name, product) {
		await Redis.set(`${name}:${product.id}`, JSON.stringify(product))
	}

	async createCache(all, name) {
		let productsForceCache = (all) ? await Product
			.query()
			.with('category')
			.fetch() : await Product.all()

		productsForceCache = productsForceCache.toJSON()

		const promiseCache = productsForceCache.map(async (product) => {
			await Redis.set(`${name}:${product.id}`, JSON.stringify(product))
		})
		await Promise.all(promiseCache)

		return productsForceCache
	}

}

module.exports = ProductController
