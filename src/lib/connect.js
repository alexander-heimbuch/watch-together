import io from "socket.io-client";
import * as status from "./status";
import { throttle } from 'lodash';
import { server } from "./env";
import log from './client-logger'

export default (video) => (id) => {
  const socket = io(server);

  status.connecting(`Looking for a party server :)`);

  socket.on("connect", () => {
    log("Connected to server");
    socket.emit("session", id);
  });

  socket.on("role", (mode) => {
    log("started in mode", mode)

    if (mode === "client") {
      status.client(`You are one of the stream ${id} peers, lean back and enjoy!`);

      socket.on("play", (currentTime) => {
        log(`start playback at ${currentTime}`);
        video.currentTime = currentTime || 0;
        video.play();
      });

      socket.on("play", (currentTime) => {
        log(`start playback at ${currentTime}`);
        video.currentTime = currentTime || 0;
        video.play();
      });

      socket.on("pause", (currentTime) => {
        log(`pause playback at ${currentTime}`);
        video.currentTime = currentTime || 0;
        video.pause();
      });

      socket.on("updatetime", (timeStamp) => {
        if (timeStamp > video.currentTime + 3 * 1000 || timeStamp < video.currentTime + 3 * 1000) {
          video.currentTime = currentTime;
          log(`out of sync (current: ${video.currentTime}, recieved: ${timeStamp})`);
        }
      });
    }

    if (mode === "master") {
      status.host(`You are the host of the stream ${id}`);

      video.addEventListener("play", () => {
        socket.emit("play", { payload: video.currentTime, session: id });
      });

      video.addEventListener("pause", () => {
        socket.emit("pause", { payload: video.currentTime, session: id });
      });

      video.addEventListener("timeupdate", throttle(({ timeStamp }) => {
        socket.emit("updatetime", { payload: timeStamp, session: id });
      }, 1000));
    }
  });
};
