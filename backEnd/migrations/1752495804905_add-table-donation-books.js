/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('donation_books', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    title: {
      type: 'varchar(50)',
      notNull: true,
    },
    author: {
      type: 'varchar(50)',
      notNull: true,
    },
    publisher: {
      type: 'varchar(50)',
      notNull: true,
    },
    publish_year: {
      type: 'integer',
      notNull: true,
    },
    synopsis: {
      type: 'text',
    },
    genre: {
      type: 'varchar(50)',
      notNull: true,
    },
    created_at: {
      type: 'varchar(50)',
      notNull: true,
    },
    updated_at: {
      type: 'varchar(50)',
      notNull: true,
    },
    owner: {
      type: 'varchar(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    book_condition: {
      type: 'varchar(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('donation_books');
};
