const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const port = process.env.PORT || 3333;

dotenv.config();

app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
app.set('json spaces', 2);

app.use('/screenings', require('./routes/screenings'));
app.use('/users', require('./routes/users'));

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected to db')
);
mongoose.set('useFindAndModify', false);

app.listen(port, () => console.log('Server ready on port ' + port));
