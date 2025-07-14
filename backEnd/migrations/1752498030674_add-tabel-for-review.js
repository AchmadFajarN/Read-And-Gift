/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('review_books', {
        id: {
            type: 'VARCHAR(100)',
            primaryKey: true
        },
        title: {
            type: 'TEXT',
            notNull: true
        },
        author: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        publisher: {
            type: 'VARCHAR(100)'
        },
        publish_year: {
            type: 'INTEGER',
        },
        synopsis: {
            type: 'TEXT'
        },
        genre: {
            type: 'TEXT[]'
        },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        owner: {
            type: 'VARCHAR(100)',
            references: 'users(id)',
            onDelete: 'CASCADE',
            notNull: true
        },
        rating: {
            type: 'INTEGER',
            notNull: true,
            check: 'rating >= 1 AND rating <=5'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('review_books');
};
