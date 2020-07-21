import multer from 'multer'
import path from 'path'

//User's photo uploads
export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            //filename
            cb(null, `${name}-${Date.now()}${ext}`)
        },
    })
}