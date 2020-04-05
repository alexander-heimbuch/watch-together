import io from 'socket.io-client'
import * as status from './lib/status';
import { server } from './lib/env'

const socket = io(server)

const video = document.querySelector('video[src]')


if (!video) {
  status.failed(`Oh noes, no video no party :/`)
  console.error(`Prime Party: Couldn't find a video to connect to`)
} else {
  status.connecting(`Looking for a party server :)`)
  console.log(`Prime Party: Found Video`, video)

  socket.on('connect', () => {
    status.connected(`Ready to get this party started!`)
    console.log('Prime Party: Connected to server')
  });

  socket.on('play', currentTime => {
    console.log('Prime Party: start playback at', currentTime)
    video.currentTime = currentTime || 0
    video.play()
  });

  socket.on('play', currentTime => {
    console.log('Prime Party: start playback at', currentTime)
    video.currentTime = currentTime || 0
    video.play()
  });

  socket.on('pause', currentTime => {
    console.log('Prime Party: pause playback at', currentTime)
    video.currentTime = currentTime || 0
    video.pause()
  });

  socket.on('updatetime', timeStamp => {
    if (timeStamp > (video.currentTime + 3 * 1000) || timeStamp < (video.currentTime + 3 * 1000)) {
      console.log(`Prime Party: out of sync (current: ${video.currentTime}, recieved: ${timeStamp}`)
      status.syncing('Someone is out of sync, pause the video and start again to get back on track!')
    }
  })

  video.addEventListener('play', () => {
    socket.emit('play', video.currentTime)
  })

  video.addEventListener('pause', () => {
    socket.emit('pause', video.currentTime)
  })

  video.addEventListener('timeupdate', ({ timeStamp }) => {
    socket.emit('updatetime', timeStamp)
  })
}
