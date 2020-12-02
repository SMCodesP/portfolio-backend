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
            .whereIn('id', items_id)
            .fetch()

        items = items.toJSON()
        items = items.map((item) => {
            return {
                title: item.title,
                unit_price: Number(item.money),
                quantity: 1,
            }
        })

        console.log(items)

        const response = await mercadopago.preferences.create({items})

        return response.body.id
    }

}

module.exports = MercadoPagoController
