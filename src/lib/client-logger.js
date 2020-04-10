import { debug } from './env'

export default (...msgs) => {
  if (!debug) {
    return
  }

  console.log('%cWatch Together: %c' + msgs.join(' '), 'color:#234e52; font-style: italic; font-weight: bold;', 'color:inherit;')
}
