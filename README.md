# Selfhosted Solution for Cowatching

## Support

### Streaming Sites

Pretty much everything that uses a HTML5 video tag:

- Amazon Prime
- Netflix
- Disney+
- Youtube
- ...

### Browsers

- Chrome
- Safari (even mobile!)
- Firefox

## Installation

> requires node 12+, a working certificate for your domain

1. clone this repo
2. run `npm install`

## Start

1. Create a file called `local.json` in `config`
2. Adapt the configuration that is defined in `config/default.json` in this file (see [node-config](https://github.com/lorenwest/node-config))
3. Run `npm start`
4. Access `http://my-custom-server:PORT` to get the bookmarklet
5. Execute the bookmarklet on your devices

## Functionality

To syncronise videos between multiple clients a simple websocket client and server (relay) is used. A very simple bookmarklet is used to inject the socket client into the streaming site. Each client generates a a random uuid that is used as a session identifier. The client that registers first with a new session id will run in operator mode. Every media control (play/pause/scrub) is pushed to the server and relayed to all other clients that registered for the same session id.
