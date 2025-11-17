const User = require("../models/User");
const tokenService =  require("../services/tokenService");
const {success,error} = require("../utils/response");

exports.register = async (req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        const exist = await User.findOne({email});
        if(exist) return error(res,"EMail Aldready registered",400);

        const user = new User({name,email,password,role});
        await user.save();

        const token = tokenService.generateToken(user);

        return success(res,{token,user},"User registered succesfully");


    }
    catch (err){
        return error(res, err.message);

    }
}

exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne(email);
        if(!user) return error(res,"USer Not found",404);
        const valid = await User.comparePassword(password);
        if(!valid) return error(res,"Invalid Credentials",401);

        const token= tokenService.generateToken({user});

        return success(res, { token, user },"LOGGED IN SUCCESSFULLY");
    }
    catch(error)
    {
        return error(res,err.message)
    }
}