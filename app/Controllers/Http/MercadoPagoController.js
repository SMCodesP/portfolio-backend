'use strict'

const Product = use("App/Models/Product")
const mercadopago = require('mercadopago');

mercadopago.configure({
	access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
})

class MercadoPagoController {

    async store({request}) {
        const items_id = request.input('items')

        let items = await Product
            .query()
            .with('category')
            .whereIn('id', items_id)
            .fetch()

        items = items.toJSON()
        items = items.map((item) => {
            return {
                id: `#${item.id} ${item.title}`,
                title: item.title,
                unit_price: Number(item.money),
                category_id: item.category.name,
                picture_url: item.image_large,
                currency_id: "BRL",
                quantity: 1,
            }
        })

        console.log(items)

        const response = await mercadopago.preferences.create({
            items,
            back_urls: {
                success: `${process.env.FRONT_END}/paid`,
                failure: `${process.env.FRONT_END}/paid`,
                pending: `${process.env.FRONT_END}/paid`
            },
            auto_return: "approved"
        })

        return response.body
    }

}

module.exports = MercadoPagoController
