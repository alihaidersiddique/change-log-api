import express from 'express'
import router from "./router"
import morgan from "morgan"
import cors from "cors"
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

/**
 * Middlewares
 */

// app.use((req, res, next) => {
//     // req.myKey = 'doggy'
//     // next()
//     res.status(401)
//     res.send('Nope')
// })

app.use(cors())
app.use(morgan('dev')) // to log which route hitted
app.use(express.json()) // to convert the coming data in json object
app.use(express.urlencoded({ extended: true })) // to easily get the values from url

app.get('/', (req, res, next) => {
    res.json({ message: 'nope' })
})

app.use('/api', protect, router)
app.use('/user', createNewUser)
app.use('/signin', signin)

// error handler for above routes
// we add error handler always after all routes
app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    } else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' })
    } else {
        res.status(500).json({ message: 'Oops, thats on us' })
    }
})

export default app;