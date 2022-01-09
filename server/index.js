const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const sendJustMetaToCrawlers = require('./middleware/sendJustMeta');

const port = process.env.PORT || 3333;

dotenv.config();

app.use(express.json());
app.set('json spaces', 2);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get(/^(?!\/api)/, sendJustMetaToCrawlers, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use('/api/screenings', require('./routes/screenings'));
app.use('/api/serials', require('./routes/serials'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/quotes', require('./routes/quotes'));
app.use('/api/newsletter', require('./routes/newsletter'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to db'))
  .catch((err) => console.error(err));

app.listen(port, () => console.log('Server ready on port ' + port));
