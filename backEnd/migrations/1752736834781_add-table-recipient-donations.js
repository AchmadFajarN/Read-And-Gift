/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('recipient_donations', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    id_donation: {
      type: 'varchar(50)',
      notNull: true,
      references: '"donation_books"',
      onDelete: 'cascade',
    },
    user_id: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    recipient_id: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    donation_status: {
      type: 'varchar(20)',
      notNull: true,
      default: 'pending',
    },
  });

  pgm.addConstraint('recipient_donations', 'valid_donation_status', {
    check: `donation_status IN ('pending', 'approved', 'rejected')`,
  });
};

exports.down = (pgm) => {
  pgm.dropTable('recipient_donations');
};
