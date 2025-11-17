const Room = require("../models/Room");
const generateRoomCode = require("../utils/generateRoomCode");
const {success,error} =require("../utils/response");

exports.createRoom = async (req,res)=>{
    try{
    const {type} = req.body;
    const userId =  req.user.id;

    let roomData={
        owner:userId,
        type,
        isPublic:type=="Public"
    };

    if(type=="Private")
    {
        roomData.roomCode = generateRoomCode();
    }
    const room = new Room(roomData);
    await room.save();

    return success(res,room,"ROom created Successfully");
    }
    catch(error)
    {
        return error(res,error.message);
    }

};


exports.joinRoom = async (req,res)=>{

    try{
        const {roomId,roomCode} = req.body;
        const room = await Room.findById(roomId);
        if(!room) return error(res,"Room not found",404);
        if(!room.isPublic && room.roomCode!=roomCode) return error(res,"Invalid Room Code",401);

        return success(res,room,"Joined ROom Successfully");
    }
    catch(error){
        return error(res,error.message);
    }
};