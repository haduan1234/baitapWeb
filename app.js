import express, { Router } from 'express'
import mysql from 'mysql'
import productRoute from './route/exerciseRoute.js'


import db from './db.js'

db.connect();



const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))


app.use('/product', productRoute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})