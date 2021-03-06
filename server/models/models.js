
const mongoose=require('mongoose')
const personSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number
    },
    capital:{
       type:Number
    },
    plan:{
        type:String
    },
    resetToken:{
        type:String
    },
    expireToken:{
        type:Date
    },
    pending:{
        plan:{
            type:String
        },
        deposit:{
            type:Number
        }
    }
})
module.exports=mongoose.model('person',personSchema)