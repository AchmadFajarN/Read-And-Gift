const fs = require('fs');
const { Pool } = require('pg');
const path = require('path');

class StorageService{
    constructor(folder) {
        this._folder = folder;
        this._pool = new Pool();

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

    async writeFile(file, filename) {
        try {
            const path = `${this._folder}/${filename}`

            const fileStream = fs.createWriteStream(path);

            return new Promise((resolve, reject) => {
                fileStream.on("error", (err) => reject(err));
                file.pipe(fileStream);
                file.on("end", () => resolve(filename));
            })
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = StorageService;