// routes/index.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const registry_model=require('./db2')
const accountSid = 'ACbebdd753c48f4247ec74e8674bfb759d';
const authToken = '288825e56fa18daf1af0920d9345db76';
const twilioClient = twilio(accountSid, authToken);

router.post('/send-sms',async(req, res) => 
{   
    const toNumber = req.body.to;
    const messageBody = req.body.body;
    try
    {
        const regno=await registry_model.find({vehicleRegno:toNumber.toUpperCase()})
        const cn1=regno[0].cn1
        const newcn1='+91'+cn1.toString()
        twilioClient.messages
        .create({
            body: messageBody,
            to: newcn1,
            from: '+16125677921', 
        })
        .then((message) => {
            console.log('Message sent successfully:', message.sid);
            res.json({ status: 'success', message: 'SMS sent successfully' });
        })
        .catch((error) => {
            console.error('Error sending message:', error.message);
            res.status(500).json({ status: 'error', message: 'Failed to send SMS', error: error.message });
        });
    }
    catch(error) 
    {
        console.log(error)
    }

});

// making calls 
router.post('/make-call', async(req, res) => {
    const toNumber = req.body.to;
    const twiml = 'http://demo.twilio.com/docs/voice.xml'; 

    try 
    {
        const regno=await registry_model.find({vehicleRegno:toNumber.toUpperCase()})
        const cn1=regno[0].cn1
        const newcn1='+91'+cn1.toString()
        twilioClient.calls
        .create({
            twiml,
            to: newcn1,
            from: '+16125677921'
        })
        .then((call) => {
            console.log('Call initiated successfully:', call.sid);
            res.json({ status: 'success', message: 'Call initiated successfully' });
        })
        .catch((error) => {
            console.error('Error making call:', error);
            res.status(500).json({ status: 'error', message: 'Failed to make call' });
        });
    } 
    catch (error) 
    {
        console.log(error)
    }
});

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;