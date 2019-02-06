let mongoose = require('mongoose')
let Entity = require('../models/entity')

function getEntities (req, res) {
  let query = Entity.find({})

  query.exec((err, entity) => {
    if (err) res.send(err)

    res.json(entity)
  })
}

function postEntity (req, res) {
  var newEntity = new Entity(req.body)

  newEntity.save((err, entity) => {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Entity successfully added!', entity })
    }
  })
}

function getEntity (req, res) {
  Entity.findById(req.params.id, (err, entity) => {
    if (err) res.send(err)

    res.json(entity)
  })
}

function deleteEntity (req, res) {
  Entity.deleteOne({ _id: req.params.id }, (err, result) => {
    res.json({ message: 'Entity successfully deleted!', result })
  })
}

function updateEntity (req, res) {
  Entity.findById({ _id: req.params.id }, (err, entity) => {
    if (err) res.send(err)
    Object.assign(entity, req.body).save((err, entity) => {
      if (err) res.send(err)
      res.json({ message: 'Entity updated!', entity })
    })
  })
}

module.exports = { getEntities, postEntity, getEntity, deleteEntity, updateEntity }
