const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { test } = require('../controllers/controller')
const Song = require('../model/Song')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      cb(null, 'public/uploads/coverImages')
    } else if (file.fieldname === 'audio') {
      cb(null, 'public/uploads/audios')
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })

router.post(
  '/create-song',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const newSong = new Song({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album: req.body.album,
        year: req.body.year,
        coverImage: req.files?.coverImage?.[0]?.filename,
        audio: req.files?.audio?.[0]?.filename,
      })

      await newSong.save()
      res.status(201).json({ success: true, song: newSong })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ success: false, error: error.message })
    }
  }
)

router.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find()
    res.json(songs)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs' })
  }
})

router.delete('/songs/:id', async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.put(
  '/songs/:id',
  upload.fields([{ name: 'audio' }, { name: 'coverImage' }]),
  async (req, res) => {
    try {
      const update = {
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        album: req.body.album,
        year: req.body.year,
      }

      if (req.files?.audio?.[0]) {
        update.audio = req.files.audio[0].filename
      } else if (req.body.existingAudio) {
        update.audio = req.body.existingAudio
      }

      if (req.files?.coverImage?.[0]) {
        update.coverImage = req.files.coverImage[0].filename
      } else if (req.body.existingCoverImage) {
        update.coverImage = req.body.existingCoverImage
      }

      const updated = await Song.findByIdAndUpdate(req.params.id, update, {
        new: true,
      })

      res.json(updated)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  }
)

router.get('/', test)

module.exports = router
