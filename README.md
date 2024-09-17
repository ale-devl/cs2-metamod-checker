# cs2-metamod-checker

Checks whether MetaMod is no longer enabled (for example due to an update) and enables it when necessary.

## Usage

1. **Download the repository** and run `npm install` in its root directory.
2. **Edit `config/default.json`** and add all `gameinfo.gi` files and their paths there. This tool is capable of checking multiple servers, so add all files here instead of running multiple instances.
3. **Run the app** via `node index.js`. Consider using a process manager. I recommend [PM2](https://pm2.io).