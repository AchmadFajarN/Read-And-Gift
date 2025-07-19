/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('cover_path_donations', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    donation_image_path: {
      type: 'text',
      notNull: true,
    },
    donation_id: {
      type: 'varchar(50)',
      notNull: true,
      references: '"donation_books"',
      onDelete: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('cover_path_donations');
};
