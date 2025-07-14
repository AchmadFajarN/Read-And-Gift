const fs = require('fs');
const path = require('path');

class StorageService{
    constructor(folder) {
        this._folder = folder;

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

async writeFile(file, filename, subFolder = '') {
  const folderPath = path.join(this._folder, subFolder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const fullPath = path.join(folderPath, filename);

  const fileStream = fs.createWriteStream(fullPath);

  return new Promise((resolve, reject) => {
    fileStream.on('error', reject);
    file.pipe(fileStream);
    file.on('end', () => resolve(filename));
  });
}
}

module.exports = StorageService;