import io from "socket.io-client";
import * as status from "./status";
import { server } from "./env";

export default (video) => (id) => {
  const socket = io(server);

  status.connecting(`Looking for a party server :)`);
  console.log(`Prime Party: Found Video`, video);

  socket.on("connect", () => {
    status.connected(`Ready to get this party started!`);
    console.log("Prime Party: Connected to server");
    socket.emit("session", id);
  });

  socket.on("role", (mode) => {
    console.log("Prime Party: started in mode", mode)

    if (mode === "client") {
      socket.on("play", (currentTime) => {
        console.log("Prime Party: start playback at", currentTime);
        video.currentTime = currentTime || 0;
        video.play();
      });

      socket.on("play", (currentTime) => {
        console.log("Prime Party: start playback at", currentTime);
        video.currentTime = currentTime || 0;
        video.play();
      });

      socket.on("pause", (currentTime) => {
        console.log("Prime Party: pause playback at", currentTime);
        video.currentTime = currentTime || 0;
        video.pause();
      });

      socket.on("updatetime", (timeStamp) => {
        if (timeStamp > video.currentTime + 3 * 1000 || timeStamp < video.currentTime + 3 * 1000) {
          video.currentTime = currentTime;
          console.log(`Prime Party: out of sync (current: ${video.currentTime}, recieved: ${timeStamp})`);
        }
      });
    }

    if (mode === "master") {
      video.addEventListener("play", () => {
        socket.emit("play", { payload: video.currentTime, session: id });
      });

      video.addEventListener("pause", () => {
        socket.emit("pause", { payload: video.currentTime, session: id });
      });

      video.addEventListener("timeupdate", ({ timeStamp }) => {
        socket.emit("updatetime", { payload: timeStamp, session: id });
      });
    }
  });
};
