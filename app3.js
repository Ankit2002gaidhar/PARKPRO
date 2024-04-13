const express = require('express');
const twilio = require('twilio');
const routes = require('./routes/index'); 


const app = express();
const port = 3000;

app.set('views', 'views2');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const accountSid = 'ACbebdd753c48f4247ec74e8674bfb759d';
const authToken = '288825e56fa18daf1af0920d9345db76';
const twilioClient = twilio(accountSid, authToken);
app.use('/', routes);

app.listen(3000, () => {
    // console.log(`Server is running on http://127.0.0.1:${port}`);
    console.log(`Server is running on http://192.168.0.105:3000/`);
});