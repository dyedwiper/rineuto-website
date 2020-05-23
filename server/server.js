const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const port = process.env.PORT || 3333;

dotenv.config();

app.use(express.json());
app.use(cors());
app.set('json spaces', 2);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/screenings', require('./routes/screenings'));
app.use('/api/series', require('./routes/series'));
app.use('/api/users', require('./routes/users'));
app.use('/api/news', require('./routes/news'));

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to db')
);
mongoose.set('useFindAndModify', false);

app.listen(port, () => console.log('Server ready on port ' + port));
