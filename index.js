require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const user_controller = require('./controllers/user_controller');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/users', user_controller.create);
app.get('/api/users', user_controller.find);
app.post('/api/users/:_id/exercises', user_controller.addExercise);
app.get('/api/users/:_id/logs', user_controller.logs);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
