const fs = require('fs');
const { Pool } = require('pg');

class StorageService{
    constructor(folder) {
        this._folder = folder;
        this._pool = new Pool();

        if (!fs.existsSync(folder)) {
            fs.mkdir(folder, { recursive: true });
        }
    }

    async writeFile(file, meta) {
        try {
            const filename = +new Date() + meta.filename;
            const path = `${this._folder}/${this.filename}`

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