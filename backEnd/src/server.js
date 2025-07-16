require('dotenv').config();
const Hapi = require("@hapi/hapi");
const inert = require('@hapi/inert');
const path = require('path');
const Jwt = require('@hapi/jwt');
const ClientError = require('./exeption/ClientError');
const UploadValidator = require('./validator/uploads');

// user
const users = require('./api/user');
const UserValidator = require('./validator/users');
const UserService = require('./service/postgre/userService');

//DonationBooks
const donationbooks = require('./api/donationbooks');
const DonationBookValidator = require('./validator/donationbooks');
const DonationBooksService = require('./service/postgre/DonationBooksService');
const CoverPathDonationsService = require('./service/postgre/CoverPathDonationsService');

// profile storage
const uploadImageProfile = require("./api/uploadImageProfile");
const StorageService = require('./service/storageService/storageService');
const ImageProfileService = require('./service/postgre/imageProfileService');

// authentication
const authentication = require('./api/Authentication');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationValidator = require('./validator/authentication');
const AuthenticationService = require('./service/postgre/AuthenticationService');

// review
const review = require('./api/reviewsBook');
const ReviewValidator = require('./validator/review');
const ReviewBookService = require('./service/postgre/ReviewBookService');

// image review
const imageReview = require('./api/uploadImageReview');
const ImageReviewService = require('./service/postgre/ImageReviewService');


const init = async() => {
    const userService = new UserService();
    const imageProfileService = new ImageProfileService();
    const donationBooksService = new DonationBooksService();
    const coverPathDonationsService = new CoverPathDonationsService();
    const donationstorageService = new StorageService(path.resolve(__dirname, 'api/donationbooks/donationbookimage/'));
    const authenticationService = new AuthenticationService();
    const storageService = new StorageService(path.resolve(__dirname, 'api/uploadImageProfile/images'));
    const reviewService = new ReviewBookService();
    const imageReviewService = new ImageReviewService();
    const reviewStorage = new StorageService(path.resolve(__dirname, 'api/uploadImageReview/images'));

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
    });

    await server.register([
        {
            plugin: Jwt
        },
        {
            plugin: inert
        }
    ]);

    server.auth.strategy('read_and_gift_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE
        },
        validate: (artifacts) => {
            return{
                isValid: true,
                credentials: {
                    id: artifacts.decoded.payload.id,
                    role: artifacts.decoded.payload.role 
                }
            }
        }
    })

    await server.register([
        {
            plugin: users,
            options: {
                service: userService,
                validator: UserValidator
            }
        },
        {
            plugin: uploadImageProfile,
            options: {
                storageService,
                validator: UploadValidator,
                imageProfileService
            }
        },
        {
            plugin: authentication,
            options: {
                authenticationService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationValidator
            }
        },
        {
            plugin: donationbooks,
            options: {
                donationBooksService,
                donationstorageService,
                coverPathDonationsService,
                DonationBookValidator,
            }
        },
        {
            plugin: review,
            options: {
                reviewService,
                validator: ReviewValidator
            }
        },
        {
            plugin: imageReview,
            options: {
                reviewStorage,
                validator: UploadValidator,
                imageReviewService
            }
        }
    ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      newResponse.code(500);
      console.error(response);
      return newResponse;
    }

    return h.continue;
  });

    await server.start();
    console.log("server berjalan di", server.info.uri);
}

init();