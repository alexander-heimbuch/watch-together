import connect from './lib/connect'
import overlay from './lib/overlay'
import log from './lib/client-logger'
import detectVideo from './lib/video'

const video = detectVideo()

if (!video) {
  log(`Couldn't find a video to connect to`)
} else {
  overlay(connect(video))
}
