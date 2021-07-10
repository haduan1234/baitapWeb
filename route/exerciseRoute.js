import express from 'express'
import userController from '../controller/exerciseController.js'
import multer from 'multer'

var upload = multer({ dest: './public/uploads' })
var route = express.Router();

route.get("/Show", userController.Show)
route.get('/create', userController.create)
route.post('/create', upload.single('file_demo'), userController.postCreate)
route.get('/delete', userController.deleteExercise)
route.get('/search', userController.search)

export default route