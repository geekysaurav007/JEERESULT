const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan('dev'))
const { userRouter } = require('./routers/user')
require('./database/connection')()
app.listen(3000, () => {
    console.log("RUNNING ON 3000")
})
const apiRouter = express.Router()
apiRouter.get('', (req, resp) => {
    resp.json({ "message": "hello saurav" })
})
app.use('/api', apiRouter)

apiRouter.use('/users', userRouter)