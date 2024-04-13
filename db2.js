const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/MAIN').then(()=>console.log('connected')).catch((err)=>console.log(err))

const mainSchema=new mongoose.Schema(
    {
        firstName:
        {
            type:String,
            required:true
        },
        lastName:
        {
            type:String,
            required:true
        },
        cn1:
        {
            type:Number,
            required:true
        },
        cn2:
        {
            type:Number,
            required:true
        },
        vehicleRegno:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        cpassword:
        {
            type:String,
            required:true
        },
        gender:
        {
            type:String,
            required:true
        },
        state:
        {
            type:String,
            required:true
        }
    }
)

const registry_model=new mongoose.model('registry_model',mainSchema)

module.exports=registry_model;