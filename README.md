# FBot
Bot for Discord that tells you whenever streamer unexpectedly disconnect.

## Features:
  - Writes 'F' in chat when someone streaming disconnects

### Usage:
[Add bot to your server](https://discordapp.com/api/oauth2/authorize?client_id=701074293512994896&permissions=2112&scope=bot). Enjoy.

### Developer Installation:
1. Install all dependencies:
```sh
npm install
```
2. Add your auth token to *.env* file. (Use *example.env* as template)

### NPM Scripts:
| Script  | Description                                             |
| ------- | ------------------------------------------------------- |
| **run** | Runs your application                                   |
| release | Creates a production build of the project               |
| build   | Builds the entire project with webpack                  |
| watch   | Watches all file changes and rebuilds them if necessary |
