import connect from './lib/connect'
import overlay from './lib/overlay'

const video = document.querySelector('video[src]')

if (!video) {
  console.error(`Prime Party: Couldn't find a video to connect to`)
} else {
  overlay(connect(video))
}
