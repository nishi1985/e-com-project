import Product from '../models/Product'

class DashboardController{
    async show(req, res){
        const { user_id } = req.headers
        const products = await Product.find({ user: user_id })

        return res.json(products)

    }
}

export default new DashboardController();