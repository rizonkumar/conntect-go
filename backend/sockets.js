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
      console.log("Ride accepted, full data:", data);
      try {
        // Notify user that ride was accepted
        io.emit("ride:accepted", {
          rideId: data.rideId,
          captain: data.captain,
          status: "accepted",
        });

        // Notify other drivers that ride is no longer available
        onlineDrivers.forEach((driver) => {
          if (driver.id !== data.captainId) {
            io.to(driver.socketId).emit("ride:unavailable", data.rideId);
          }
        });

        // Update driver status in onlineDrivers map
        if (onlineDrivers.has(data.captainId)) {
          const driverData = onlineDrivers.get(data.captainId);
          onlineDrivers.set(data.captainId, {
            ...driverData,
            status: "busy",
            currentRide: data.rideId,
          });
        }
      } catch (error) {
        console.error("Error in ride:accept handler:", error);
        socket.emit("error", {
          message: "Failed to process ride acceptance",
        });
      }
    });

    // Handle ride start
    socket.on("ride:start", (data) => {
      console.log("Ride started:", data);
      io.emit("ride:started", {
        rideId: data.rideId,
        startTime: new Date(),
        status: "ongoing",
      });
    });

    // Handle ride completion
    socket.on("ride:complete", (data) => {
      console.log("Ride completed:", data);
      io.emit("ride:completed", {
        rideId: data.rideId,
        completionTime: new Date(),
        status: "completed",
        fare: data.fare,
      });

      // Update driver status back to available
      if (onlineDrivers.has(data.captainId)) {
        const driverData = onlineDrivers.get(data.captainId);
        onlineDrivers.set(data.captainId, {
          ...driverData,
          status: "available",
          currentRide: null,
        });
      }
    });

    // Handle ride cancellation
    socket.on("ride:cancel", (data) => {
      console.log("Ride cancelled:", data);
      io.emit("ride:cancelled", {
        rideId: data.rideId,
        cancellationTime: new Date(),
        status: "cancelled",
        reason: data.reason || "No reason provided",
      });

      // Update driver status back to available if cancelled by user
      if (data.captainId && onlineDrivers.has(data.captainId)) {
        const driverData = onlineDrivers.get(data.captainId);
        onlineDrivers.set(data.captainId, {
          ...driverData,
          status: "available",
          currentRide: null,
        });
      }
    });

    // Handle location updates
    socket.on("location:update", (data) => {
      console.log("Location update:", data);
      io.emit("driver:location", {
        rideId: data.rideId,
        location: data.location,
      });
    });

    // Handle chat messages
    socket.on("message:send", (data) => {
      console.log("New message:", data);
      io.emit("message:received", {
        rideId: data.rideId,
        message: data.message,
        sender: data.sender,
        timestamp: new Date(),
      });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove disconnected driver from online drivers
      for (const [captainId, data] of onlineDrivers.entries()) {
        if (data.socketId === socket.id) {
          onlineDrivers.delete(captainId);
          io.emit("drivers:count", onlineDrivers.size);
          // Notify if driver was on an active ride
          if (data.currentRide) {
            io.emit("driver:disconnected", {
              rideId: data.currentRide,
              captainId: captainId,
            });
          }
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });

    // Handle errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
      socket.emit("error", {
        message: "An error occurred",
      });
    });
  });

  // Error handling for the io server
  io.on("error", (error) => {
    console.error("IO Server error:", error);
  });
};
