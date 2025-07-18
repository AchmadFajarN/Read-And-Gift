const RecipientDonationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'recipient_donations',
  version: '1.0.0',
  register: async (server, { recipientDonationsService, recipientDonationsValidator }) => {
    const recipientDonationsHandler = new RecipientDonationsHandler(
      recipientDonationsService,
      recipientDonationsValidator,
    );
    server.route(routes(recipientDonationsHandler));
  },
};
