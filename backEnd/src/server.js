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
const donationBookValidator = require('./validator/donationbooks/index');
const DonationBooksService = require('./service/postgre/DonationBooksService');
const CoverPathDonationsService = require('./service/postgre/CoverPathDonationsService');

//RecipientDonations
const recipientDonations = require('./api/recipientdonations');
const RecipientDonationsService = require('./service/postgre/RecipientDonationsService');
const recipientDonationsValidator = require('./validator/recipientdonations');

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

// like review
const like_review = require('./api/likeReview')
const LikeReviewService = require('./service/postgre/LikeReviewService');

// comment
const comment_review = require('./api/commentReview');
const commentValidator = require('./validator/commentReview');
const CommentReviewService = require('./service/postgre/CommentReviewService');


const init = async() => {
    const userService = new UserService();
    const imageProfileService = new ImageProfileService();
    const donationBooksService = new DonationBooksService();
    const coverPathDonationsService = new CoverPathDonationsService();
    const donationstorageService = new StorageService(path.resolve(__dirname, 'api/donationbooks/donationbookimage/'));
    const authenticationService = new AuthenticationService();
    const storageService = new StorageService(path.resolve(__dirname, 'api/uploadImageProfile/images'));
    const imageReviewService = new ImageReviewService();
    const reviewStorage = new StorageService(path.resolve(__dirname, 'api/uploadImageReview/images'));
    const likeService = new LikeReviewService();
    const commentService = new CommentReviewService()
    const reviewService = new ReviewBookService(likeService, commentService);
    const recipientDonationsService = new RecipientDonationsService();

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
                donationBookValidator,
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
        },
        {
            plugin: like_review,
            options: {
                likeService,
                reviewService
            }
        },
        {
            plugin: comment_review,
            options: {
                commentService,
                validator: commentValidator,
                reviewService
            }
        },
        {
            plugin: recipientDonations,
            options: {
                recipientDonationsService,
                recipientDonationsValidator
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