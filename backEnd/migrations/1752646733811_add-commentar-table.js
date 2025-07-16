/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('comments_review', {
        id: {
            type: 'VARCHAR(200)',
            primaryKey: true
        },
        user_id: {
            type: 'VARCHAR(200)',
            references: 'users(id)',
            notNull: true,
            onDelete: 'CASCADE'
        },
        review_id: {
            type: 'VARCHAR(200)',
            references: 'review_books(id)',
            onDelete: 'CASCADE',
            notNull: true
        },
        comment: {
            type: 'TEXT',
            notNull: true
        },
        created_at: {
            type: 'TIMESTAMP',
            default: pgm.func('current_timestamp'),
            notNull: true
        },
        updated_at: {
            type: 'TIMESTAMP',
            default: pgm.func('current_timestamp'),
            notNull: true
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('comments_review');
};
