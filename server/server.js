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
app.use('/api/serials', require('./routes/serials'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notices', require('./routes/notices'));

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
