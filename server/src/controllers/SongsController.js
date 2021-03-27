const {Song} = require('../models')
const { Op } = require("sequelize")

module.exports = {
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if(search){
        console.log('Going here111111')
        songs = await Song.findAll({
          where: {
        [Op.or]: [
              'title', 'artist', 'genre', 'album'
            ].map(key => ({
              [key]: {
                [Op.like]: `%${search}%`
              }
            }))
          }
        })
        if(songs) {
          console.log(songs)
        }
      } else {
        console.log('Going here222222')
        songs = await Song.findAll({
          limit: 10
        })
        console.log("Inside loop:", JSON.stringify(songs, null, 2)); 
      }
      console.log('Just outside loop')
      console.log("All users:", JSON.stringify(songs, null, 2)); 
      res.send(songs)

    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to fetch the songs'
        })
    }
  },
  async show (req, res) {
    try{
      const song = await Song.findByPk(req.params.songId)
      console.log('testing')
      res.send(song)
      } catch (err) {
          console.log(err)
          res.status(500).send({
            error: 'An error has occurred trying to show the song'
          })
      }
  },
  async post (req, res) {
    try{
      console.log('creating a song', req.body)
      const song = await Song.create(req.body)
      console.log('after mysql:', song)
      res.send(song)
      } catch (err) {
        console.log('what error')
        console.log(err)
        res.status(500).send({
            error: 'An error has occured trying to create the song'
        })
      }
  },
  async put (req, res) {
    try{
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
      } catch (err) {
        console.log(err)

          res.status(500).send({
              error: 'An error has occured trying to update the song'
          })
      }
  }
}