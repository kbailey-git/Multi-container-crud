const compression = require('compression')
const express = require('express')
const todosRouter = require('./routes/todos.js')
const connect = require('./utils/db.js')


const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(express.json())

app.use(todosRouter)

const start = async () => {
  try {
    await connect()
    app.listen(port, () => {
      console.log('listening on port ', port)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
