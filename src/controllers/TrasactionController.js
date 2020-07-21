import Transaction from '../models/Transaction'
import Product from '../models/Product'
import User from '../models/User'
/* 
***********************   ALTERAR DATE!!!  ***************
*/
class TransactionController{

    async index(req, res){
        const { user_id } = req.headers
        const products = await Transaction.find({ user: user_id }).populate('product')

        return res.json(products)

    }

    async store(req, res){
        const { user_id } = req.headers
        const { product_id } = req.params
        const { date } = req.body

        //validate product/user
        const product = await Product.findById(product_id)
        if(!product){
            return res.status(400).json({ error: 'Produto inexistente'})
        }

        if(product.status !== true){
            return res.status(400).json({ error: 'Produto indisponível '})
        }

        const user = await User.findById(user_id)
        if(String(user._id) === String(product.user)){
            //alterar para não visualizar
            return res.status(401).json({ error: 'Produto do próprio usuário (ver TransactionController)'})
        }
        const buy = await Transaction.create({
            user: user_id,
            product: product_id,
            date,
        }) 

        await buy.populate('product').populate('user').execPopulate()

        return res.json(buy)
    }
}

export default new TransactionController()