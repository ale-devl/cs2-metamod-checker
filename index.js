import chokidar from 'chokidar';
import fs from 'fs';
import config from 'config';

const files = config.get("files");
const watcher = chokidar.watch(files, {
  persistent: true,
  ignoreInitial: false
});

watcher.on('all', fileChanged);

function fileChanged(event, path) {
  console.log("File changed: ", path);

  // Read the file
  fs.readFile(path, 'utf8', async (err, data) => {
    if (err) throw err;

    // Split into lines, insert new line at a specific position (e.g., line 10)
    const lines = data.split('\n');

    if (lines.findIndex(line => line.includes('Game    csgo/addons/metamod')) !== -1) {
      console.log(`Line already exists in ${path}`);
      return;
    }

    await wait(2000);

    // Find line after which to insert
    const targetLineIndex = lines.findIndex(line => line.includes('Game_LowViolence	csgo_lv // Perfect World content override')) + 1;

    lines.splice(targetLineIndex, 0, '\t\t\tGame    csgo/addons/metamod');

    // Write the modified file back
    fs.writeFile(path, lines.join('\n'), (err) => {
        if (err) throw err;
        console.log(`Line inserted in ${path}`);
    });
  });
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}