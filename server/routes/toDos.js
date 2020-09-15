const express = require('express')
const router = express.Router()

const db = require('../db/connection')

router.get('/', (req, res) => {
  db.getToDos()
    .then(list => {
      res.json(list)
    })
    .catch(
      console.log('Nothing here.')
    )
})

router.post('/', (req, res) => {
  const newTask = req.body
  db.addToDo(newTask)
    .then((ids) => {
      newTask.id = ids[0]
      res.json(newTask)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  db.deleteToDo(id)
  .then(taskDeleted => {
    res.json(taskDeleted)
  })
  // .catch(err => {
  //   res.send(err.message)
  // })
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedToDo = {
    id: Number(req.params.id),
    ...req.body
  }
  db.updateToDo(id, updatedToDo)
    .then(updatedTask => {
      res.json(updatedTask)
    })
  // res.sendStatus(204)
})

module.exports = router