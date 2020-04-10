const status = document.createElement('div')

status.style.position = 'fixed'
status.style['z-index'] = '9999'
status.style.opacity = '0.5'
status.style.right = '25px'
status.style.bottom = '25px'
status.style['font-size'] = '2em'

document.body.append(status)

export const client = title => {
  status.title = title
  status.innerText = '🍿'
}

export const host = title => {
  status.title = title
  status.innerText = '📽'
}

export const failed = title => {
  status.title = title
  status.innerText = '😱'
}

export const connecting = title => {
  status.title = title
  status.innerText = '🤔'
}

export const syncing = title => {
  status.title = title
  status.innerText = '😴'
}
