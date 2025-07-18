const routes = (handler) => [
  {
    method: 'POST',
    path: '/donations/{donationBookId}/request',
    handler: handler.postRecipientDonationHandler,
    options: {
      auth: 'read_and_gift_jwt',
    },
  },
];

module.exports = routes;
