const express = require('express')
const router = express.Router()
const List = require('../models/list-model')

/**
*   @desc Добавление новой записи
**/
router.post('/list/add', (req, res) => {
  const list = new List({
    _id: req.body._id,
    name: req.body.name,
    location: req.body.location,
    currency: req.body.currency
  })
  list.save((err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        success: true,
        message: 'Item with ID '+data._id+' saved successfully!'
      })
    }
  })
})

/**
*   @desc Запрос всех записей
**/
router.get('/list', (req, res) => {
  List.find({}, 'id name location currency', (err, list) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ list: list })
    }
  }).sort({ _id: -1 })
})

/**
*   @desc Запрос одной записи (по id)
**/
router.get('/list/:id', (req, res) => {
  List.findById(req.params.id, 'id name location currency', (err, item) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(item)
    }
  })
})

/**
*   @desc Изменение одной записи (по id)
**/
router.put('/list/:id', (req, res) => {
  List.findById(req.params.id, 'id name location currency', (err, item) => {
    if (err) {
      console.log(err)
    } else {
      if(req.body){
        if (req.body.name) item.name = req.body.name
        if (req.body.location) item.location = req.body.location
        if (req.body.currency) item.currency = req.body.currency
      }
      item.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

/**
*   @desc Удаление одной записи (по id)
**/
router.delete('/list/remove/:id', (req, res) => {
  List.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router;