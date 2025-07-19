/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('likes_review', {
        id: {
            primaryKey: true,
            type: 'VARCHAR(200)'
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
        }
    });

    pgm.addConstraint('likes_review', 'unique_user_review_like', {
        unique: ['user_id', 'review_id']
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('likes_review', 'unique_user_review_like');
    pgm.dropTable('likes_review');
};
