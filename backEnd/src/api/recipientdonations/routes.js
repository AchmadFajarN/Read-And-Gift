const routes = (handler) => [
  {
    method: 'POST',
    path: '/recipient-donations/{donationBookId}/request',
    handler: handler.postRecipientDonationHandler,
    options: {
      auth: 'read_and_gift_jwt',
    },
  },
  {
    method: 'PATCH',
    path: '/recipient-donations/{recipientDonationId}/status',
    handler: handler.updateDonationStatusHandler,
    options: {
      auth: 'read_and_gift_jwt',
    },
  },
  {
    method: 'GET',
    path: '/recipient-donations',
    handler: handler.getRecipientDonationsHandler,
    options: {
      auth: 'read_and_gift_jwt',
    },
  },
];

module.exports = routes;
