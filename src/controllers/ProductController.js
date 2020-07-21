import Product from '../models/Product'
import User from '../models/User'
import * as Yup from 'yup'
/*
***************  DUVIDA PERTINENTE  *************************

Não há um meio de não repetir os parâmetros nas requisições?

***************  DUVIDA PERTINENTE  *************************
*/
class ProductController{
    //Produxts show list
    async index(req, res){
        const { status } = req.query
        const product = await Product.find({ status })

        return res.json(product)
    }

    //Store new peoduct
    async store(req, res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        })

        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Preencha todos os dados corretamente!' })
        }
        const product = await Product.create({
            //parametros ainda sem tratativa
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,

        })
        return res.json(product)
    }

    //update stored product
    async update(req, res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        })

        const { filename } = req.file
        const { product_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Preencha todos os dados corretamente!' })
        }

        //Validate user to update
        const user = await User.findById(user_id)
        const product = await Product.findById(product_id)

        if(String(user._id) !== String(product.user))            
            return res.status(401).json({ error: 'Update não autorizado'})

        await Product.updateOne({ _id: product_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })
        return res.send()
    }

    //To exclude a product
    async destroy(req, res){
        const { product_id } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id)
        const product = await Product.findById(product_id)

        if(String(user._id) !== String(product.user))
            return res.status(401).json({ error: 'Update não autorizado '})

        await Product.findByIdAndDelete({ _id: product_id })

        return res.json({ message: 'Detetado!'})
    }
    
}

export default new ProductController()