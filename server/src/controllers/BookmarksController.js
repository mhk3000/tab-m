const {
  Bookmark,
  Song
} = require('../models')
const { Op } = require("sequelize")

module.exports = {
  async index (req, res) {
    try {
      const {userId} = req.query
      console.log('BookmarksController.js - index/get')
      console.log('userId:', userId)
      let bookmark = await Bookmark.findAll({
        where: {
          UserId: userId
        }
      })
      // let bookmark = await Bookmark.findAll({
      //   where: {
      //     [Op.or]: [{
      //         SongId: {
      //           [Op.eq]: songId
      //         }
      //       },
      //       {
      //         UserId: {
      //           [Op.eq]: userId
      //         }
      //       } 
      //     ]
      //   }
      // })
      console.log('BookmarksController.js bookmark return: ', bookmark)
      res.send(bookmark)
    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to fetch the bookmark'
        })
    }
  },
  async post (req, res) {
    try {
      const {songId, userId} = req.body
      console.log('BookmarksController - post')
      console.log('songId:', songId)
      console.log('userId:', userId)
      const bookmark = await Bookmark.findAll({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log("Post request bookmark: ", bookmark)
      if(bookmark.length != 0) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        UserId: userId,
        SongId: songId
      })
      console.log("Bookmarkid: ", newBookmark.id, newBookmark)
      res.send(newBookmark)
    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to create the bookmark'
        })
    }
  },
  async delete (req, res) {
    try {
      console.log('BookmarksController - delete')
      const {songId, userId} = req.query
      console.log('songId:', req)
      console.log('userId:', userId)
      const bookmark = await Bookmark.findAll({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      const rowsDeleted = await Bookmark.destroy({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log('rowDeleted: ', rowsDeleted)

      res.send(bookmark)
    } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has occurred trying to delete the bookmark'
        })
    }
  }
}