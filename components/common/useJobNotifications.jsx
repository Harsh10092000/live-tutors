"use client"
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8010"); // or your server URL

function useJobNotifications(onNotification) {
  useEffect(() => {
    socket.on("new_job_notification", (data) => {
      onNotification(data); // Show toast, add to notification list, etc.
    });
    return () => {
      socket.off("new_job_notification");
    };
  }, [onNotification]);
}

export default useJobNotifications;