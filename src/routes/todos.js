const router = require('express').Router()
const mongoose = require('mongoose')
const todo = require('../models/todo.js')

router.get('/todos', (req, res) => {
  todo.find({})
    .then(foundTodos => {
      res.send(foundTodos)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error finding todos')
    })
})

router.get('/todos/:id', (req, res) => {
  const _id = req.params.id
  const cond = mongoose.Types.ObjectId.isValid(_id)
  if (!cond) {
    console.error('invald id ', _id)
    res.status(500).send('Invalid ID')
    return
  }
  todo.findById(_id)
    .then(foundTodo => {
      res.send(foundTodo)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Error finding todos')
    })
})

router.post('/todos', (req, res) => {
  // console.log(req)
  const toSave = new todo(req.body)
  toSave.save()
    .then(todo => {
      console.log('todo saved:', todo)
      res.send(todo)
    })
    .catch(err => {
      console.error('Error saving todo:', err)
    })
})

router.put('/todos/:id', (req, res) => {
  const _id = req.params.id
  const toUpdate = { task: req.body.task }
  const cond = mongoose.Types.ObjectId.isValid(_id)
  if (!cond) {
    console.error('invald id ', _id)
    res.status(500).send('Invalid ID')
    return
  }

  todo.findOneAndUpdate({ _id }, toUpdate, { new: true })
    .then(updatedTodo => {
      if (!updatedTodo) {
        res.status(200).send(`no todo found with id: ${_id}`)
      } else {
        res.status(200).send(`updated ${updatedTodo}`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting todo')
    })
})

router.delete('/todos/:id', (req, res) => {
  const _id = req.params.id
  const cond = mongoose.Types.ObjectId.isValid(_id)
  if (!cond) {
    console.error('invald id ', _id)
    res.status(500).send('Invalid ID')
    return
  }
  todo.findByIdAndDelete(_id)
    .then(foundTodo => {
      if (!foundTodo) {
        res.status(200).send(`no todo found with id: ${_id}`)
      } else {
        res.status(200).send(`deleted ${foundTodo}`)
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error deleting todo')
    })
})

module.exports = router
