const PORT = 8080;
const DEV_DB_URL = 'mongodb://prosaicSolutions:JSONgoldman90034@ds037997.mlab.com:37997/prosaic_solutions_labs';

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGODB_URI || DEV_DB_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const lab = require('./routes/lab.route');
app.use('/labs', lab);

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));