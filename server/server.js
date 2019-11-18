const express = require('express')
const app = express()
const cors = require('cors')

app.listen(3333, () => console.log('Server ready on port 3333'))

app.use(express.json())
app.use(cors())
app.set('json spaces', 2)

app.use('/screenings', require('/routes/screenings'))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/rineuto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.set('useFindAndModify', false)
