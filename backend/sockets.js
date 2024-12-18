const onlineDrivers = new Map(); // Store online drivers

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Captain/Driver comes online
    socket.on("captain:online", (captainData) => {
      console.log("Captain came online:", captainData);
      onlineDrivers.set(captainData.id, {
        socketId: socket.id,
        ...captainData,
      });

      // Broadcast updated online drivers count
      io.emit("drivers:count", onlineDrivers.size);
    });

    // Captain/Driver goes offline
    socket.on("captain:offline", (captainId) => {
      console.log("Captain went offline:", captainId);
      onlineDrivers.delete(captainId);
      io.emit("drivers:count", onlineDrivers.size);
    });

    // New ride request
    socket.on("ride:request", (rideData) => {
      console.log("New ride request:", rideData);
      // Broadcast ride request to all online drivers
      onlineDrivers.forEach((driver) => {
        io.to(driver.socketId).emit("ride:new_request", rideData);
      });
    });

    // Captain accepts ride
    socket.on("ride:accept", (data) => {
      console.log("Ride accepted:", data);
      // Notify user that ride was accepted
      io.to(data.userId).emit("ride:accepted", {
        rideId: data.rideId,
        captain: data.captain,
      });

      // Notify other drivers that ride is no longer available
      onlineDrivers.forEach((driver) => {
        if (driver.id !== data.captainId) {
          io.to(driver.socketId).emit("ride:unavailable", data.rideId);
        }
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove disconnected driver from online drivers
      for (const [captainId, data] of onlineDrivers.entries()) {
        if (data.socketId === socket.id) {
          onlineDrivers.delete(captainId);
          io.emit("drivers:count", onlineDrivers.size);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });
};
