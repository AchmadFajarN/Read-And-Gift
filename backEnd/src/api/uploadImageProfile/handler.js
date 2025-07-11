class UploadImageProfileHandler {
    constructor(storageService, validator, imageProfileService) {
        this._storageService = storageService;
        this._validator = validator;
        this._imageProfileService = imageProfileService;
    }

    async postUploadImageHandler(req, h) {
        const { image } = req.payload;
        const { id } = req.params;

        this._validator.validateImageHeader(image.hapi.headers);
        const { filename: meta } = image.hapi;
        const fileName =  +new Date() + meta.filename;
        const pathUrl = `http://${process.env.HOST}:${process.env.POST}/profile/${fileName}`;  

        await this._imageProfileService.uploadImageProfile(id, pathUrl);
        await this._storageService.profileImageWriteFile(image, image.hapi, id, 'profile');

        const response = h.response({
            status: 'success',
            message: 'Foto profile berhasil diunggah'
        });

        response.code(201);
        return response;
    }
}