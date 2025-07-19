exports.up = (pgm) => {
  pgm.addColumn('donation_books', {
    is_available: {
      type: 'boolean',
      notNull: true,
      default: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumn('donation_books', 'is_available');
};
