const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ quiet: true })
const app = express()
const PORT = process.env.PORT || 5000
const path = require('path')
const cors = require('cors')
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'public/uploads'))
)
app.use(express.json())
app.use('/', require('./routes/route'))
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => console.log(err))
