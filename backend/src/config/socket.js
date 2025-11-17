const crypto = require("crypto");

const initializeSocket = (io) =>{
    const protectedRooms = new Map();

    io.on("connection",(socket)=>{
        console.log("🔌 User connected:",socket.id);

        socket.on("joinPublicRoom",({ roomId, username })=>{
            socket.join(roomId);
            io.to(roomId).emit("notification",`${username} joined the room`);
        });
        
        socket.on("createProtectedRoom",({ username })=>{
            const roomId = crypto.randomUUID();
            const roomCode = Math.floor(100000 + Math.random()*900000).toString();

            protectedRooms.set(roomId,{
                code:roomCode,
                owner:socket.id,
                createdAt: new Date()
            });
            socket.join(roomId);
            socket.emit(`🔐 Protected room created: ${roomId} with code ${roomCode}`);
        });

        socket.on("joinProtectedRoom",({roomId,roomCode,username})=>{
            const roomData = protectedRooms.get(roomId);

            if(!roomData)
            {
                socket.emit("errorMessage", "Room not found");
                return;
            }
            if (roomData.code !== roomCode) {
                socket.emit("errorMessage", "Invalid room code");
                 return;
            }

            socket.join(roomId);
            io.to(roomId).emit("notification", `${username} joined protected room`);
            
        });


        socket.on("newBid", ({ roomId, user, amount }) => {
            io.to(roomId).emit("bidUpdate", { user, amount, time: new Date() });
          });


          socket.on("disconnect", () => {
            console.log("❌ User disconnected:", socket.id);
          });
    });
}