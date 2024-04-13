const express=require('express')
const app=express();
const hbs=require('hbs')
const QRCode = require('qrcode');
app.set('view engine','hbs')

const registry_model=require('./db')

const {json}=require('express')

app.get('/login',(req,res)=>
{
    res.render('login')
})
app.get('/register',(req,res)=>
{
    res.render('register')
})
app.get('*',(req,res)=>
{
    res.send('error 404')
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.post('/register',async(req,res)=>
{
    try 
    {
        const checkr =await registry_model.find({email:req.body.email})
        const checkm =await registry_model.find({vehicleRegno:req.body.Registration})
        // console.log(checkr)
        // console.log(checkr[0].cn1)
        if(checkr.length==0 && checkm.length==0)
        {
            const newDoc=new registry_model(
                {
                    firstName:req.body.fname,
                    lastName:req.body.lname,
                    cn1:req.body.cn1,
                    cn2:req.body.cn2,
                    vehicleRegno:req.body.Registration.toUpperCase(),
                    email:req.body.email,
                    password:req.body.password,
                    cpassword:req.body.cpassword,
                    gender:req.body.radiogroup1,
                    state:req.body.state
    
                }
            )
            const result=await newDoc.save();
            const TARGET_WEBSITE = 'http://192.168.0.105:3000/';
            const vehicleRegno=req.body.Registration
            try 
            {
                // Generate the QR code
                const qrData = `${TARGET_WEBSITE}`;
        
                // Await the promise returned by QRCode.toDataURL
                const qrImage = await QRCode.toDataURL(qrData);
        
                console.log(qrImage);
        
                // Render the QR code image
                res.status(201).render('afterregister', {vehicleRegno, qrImage });
            } 
            catch (error) 
            {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        }
        else if(checkr.length!=0 && checkm.length!=0)
        {
            res.render('alreadyReg')
        }
        else if(checkm.length!=0)
        {
            res.render('regRepeat')
        }
        else
        {
            res.render('emailreg')
        }
    } 
    catch(error) 
    {
        console.log(error)
    }
})

app.post('/login',async(req,res)=>
{
    try 
    {
        const check =await registry_model.find({email:req.body.email})
        if(check.length==0)
        {
            res.render('emailnotfound')
        }
        else
        {
            if(check[0].password===req.body.password)
            {
                const TARGET_WEBSITE = 'http://192.168.0.105:3000/';
                try 
                {
                    // Generate the QR code
                    const qrData = `${TARGET_WEBSITE}`;
        
                    // Await the promise returned by QRCode.toDataURL
                    const qrImage = await QRCode.toDataURL(qrData);
        
                    console.log(qrImage);
        
                    // Render the QR code image
                    // res.status(201).render('afterregister', {vehicleRegno, qrImage });
                    // res.render('correctlogin',{name:check[0].firstName,vehicleRegno:check[0].vehicleRegno,qrImage})
                    res.render('correctlogin',{view:check[0],qrImage})
                } 
                catch (error) 
                {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                }
                
            }
            else
            {
                // res.render('login')
                res.render('incorrectlogin')
            }
        }
    } 
    catch(error) 
    {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})



app.listen(8000,()=>
{
    console.log('hi maam')

})