/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('cover_url_reviews', {
        id: {
            type: 'VARCHAR(100)',
            primaryKey: true
        },
        url: {
            type: 'TEXT',
            notNull: true
        },
        review_book_id: {
            type: 'VARCHAR(100)',
            notNull: true,
            references: 'review_books(id)',
            onDelete: 'CASCADE'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('cover_url_reviews');
};
