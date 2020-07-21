import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'

import SessionController from './controllers/SessionController'
import ProductController from './controllers/ProductController'
import DashboardController from './controllers/DashboardController'
import TrasactionController from './controllers/TrasactionController'

const routes = new Router()
const upload = multer(uploadConfig)

routes.post('/session', SessionController.store)

// switch single() to array for multiples uploads
routes.post('/product', upload.single('thumbnail'), ProductController.store)
routes.get('/product', ProductController.index)
routes.put('/product/:product_id', upload.single('thumbnail'), ProductController.update)
routes.delete('/product', ProductController.destroy)

routes.get('/dashboard', DashboardController.show)

routes.post('/product/:product_id/transaction', TrasactionController.store)
routes.get('/myproducts', TrasactionController.index)

export default routes