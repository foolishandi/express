const mongoose =require('mongoose')

const type={
    username:String,
    password:String,
    age:Number,
    avatar:String
}

const userModule=mongoose.model('user',new mongoose.Schema(type))//对应users集合

module.exports=userModule