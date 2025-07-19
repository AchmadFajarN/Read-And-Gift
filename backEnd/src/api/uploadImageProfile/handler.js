class UploadImageProfileHandler {
    constructor(storageService, validator, imageProfileService) {
        this._storageService = storageService;
        this._validator = validator;
        this._imageProfileService = imageProfileService;

        this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
    }

    async postUploadImageHandler(req, h) {
        const { image } = req.payload;
        const { id } = req.params;

        this._validator.validateImageHeader(image.hapi.headers);
        const { filename: meta } = image.hapi;
        const fileName = `${+new Date()}-${meta}`;
    
        const pathUrl = `http://${process.env.HOST}:${process.env.PORT}/profile/${fileName}`;  

        await this._imageProfileService.uploadImageProfile(id, pathUrl);
        await this._storageService.writeFile(image, fileName);

        const response = h.response({
            status: 'success',
            message: 'Foto profile berhasil diunggah',
            data: {
                url: pathUrl
            }
        });

        response.code(201);
        return response;
    }
}

module.exports = UploadImageProfileHandler