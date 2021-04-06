const {
  History,
  Song
} = require('../models')
const { Op } = require("sequelize")

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      console.log('HistorysController.js - index/get')
      console.log('userId:', userId)
      let history = await History.findAll({
        where: {
          UserId: userId
        }
      })
      // console.log('HistorysController.js history return: ', history)
      res.send(history)
    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to fetch the history'
        })
    }
  },
  async post (req, res) {
    try {
      const {songId} = req.body
      const userId = req.user.id
      // console.log('HistorysController - post')
      // console.log('songId:', songId)
      // console.log('userId:', userId)

      const newHistory = await History.create({
        UserId: userId,
        SongId: songId
      })
      // console.log("id: ", newHistory.id, newHistory)
      res.send(newHistory)
    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to create the history object'
        })
    }
  }
}