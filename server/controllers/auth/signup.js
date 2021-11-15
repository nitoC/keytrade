const bcrypt=require('bcryptjs')
const mongoose=require('mongoose')
const user=require('../../models/models')
const jwt=require('jsonwebtoken')
const  signup= async(req,res)=>{
    const {name,email,username,password}=req.body;
    const userExists=await user.find({email:email},)
    if (userExists[0]) return res.json({message:"user exists please login"})
    let salt
    let hash;
    try{
        
        salt=await bcrypt.genSalt(8);
        hash= await bcrypt.hash(password,salt)
    }catch(error){
        if(error)console.log('password not hashed')
    }
    const eachUser=new user({
          username:username,
          name:name,
          email:email,
          capital:0.0,
          balance:0.0,
          plan:'',
          password:hash,
          resetToken:'',
          expireToken:null,
          pending:{
              plan:null,
              deposit:0
          }
    })
    try{
        await eachUser.save((err,res)=>{
            if(err) return res.status(500).json(err.message)
            else{
                return console.log('user saved');
                
            }
        })
        
        console.log('registered')
res.status(200).json({registered:true})
    }catch(err){
        if(err) return res.json({message:err.message})
    }
   
}
module.exports=signup