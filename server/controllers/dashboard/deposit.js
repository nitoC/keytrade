const person=require('../../models/models')

const deposit=async (req,res)=>{
    let user
    let tst
    const{email,capital,plan}=req.body
    console.log(email)
    try{
       user=await person.updateOne({email},{pending:{plan,deposit:capital}})
       tst=await person.findOne({email})
    }catch(err){
        console.log(err.message)

    }
    if(user){
        console.log(user)
        console.log(tst)
        return res.json("deposit request made")
    }else{
        res.json("error try again")
    }
}
module.exports= deposit