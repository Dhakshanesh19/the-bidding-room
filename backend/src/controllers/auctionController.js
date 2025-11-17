const Auction = require("../models/Auction");
const {success,error} = require("../utils/response");

exports.createAuction = async (req,res)=>{

    try{
        const {title,category,description,basePrice,imageUrl,roomId} = req.body;

        const auction = new Auction({
            title,
            category,
            description,
            imageUrl,
            basePrice,
            status:"pending",
            roomId
        });

        await auction.save();
        return success(res,"auction item created succesfully")
    }
    catch(error)
    {
        return error(res,error.message);
    }
};

exports.getAuctionByRoom = async (req,res)=>{
    try{
        const {roomId} = req.params;
        const item = await Auction.find({roomId});
        return success(res,items)
    }
    catch(error){
        return error(res,error.message);
    }
};

exports.startAuction = async (req,res)=>{
    try{
        const {auctionId} = req.body;

        const item = await Auction.findByIdAndUpdate(auctionId,{status:"live"},{new:true});
        if(!item) return error(res,"Auction item not found");
        return success(res,item,"Auction Started")
    }
    catch(err)
    {
        return error(res,err.message)
    }
};

exports.endAuction = async (req, res) => {
    try {
      const { auctionId, winnerId, finalPrice } = req.body;
  
      const updated = await Auction.findByIdAndUpdate(
        auctionId,
        {
          status: "sold",
          soldTo: winnerId,
          finalPrice
        },
        { new: true }
      );
  
      return success(res, updated, "Auction ended");
    } catch (err) {
      return error(res, err.message);
    }
  };
