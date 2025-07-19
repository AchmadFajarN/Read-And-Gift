const UploadImageProfileHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: "uploadImageProfile",
    version: '1.0.0',
    register: async(server, { storageService, validator, imageProfileService }) => {
        const uploadImageProfile = new UploadImageProfileHandler(storageService, validator, imageProfileService);
        server.route(routes(uploadImageProfile))
    }
}