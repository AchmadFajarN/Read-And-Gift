/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('review_book_post', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        user_posted: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        book_id: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        comment: {
            type: 'TEXT',
        }, 
        likes: {
            type: 'INTEGER',
            default: 0
        },
        rating_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        created_at: {
            type: 'TIMESTAMP',
            default: pgm.func('current_timestamp')
        }
    });
    pgm.addConstraint('review_book_post', 'fk_review_book_post.user_posted_users.id', 'FOREIGN KEY(user_posted) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('review_book_post', 'fk_review_book_post.book_id_books.id', 'FOREIGN KEY(book_id) REFERENCES books(id) ON DELETE CASCADE');
    

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('review_book_post', 'fk_review_book_post.book_id_books.id');
    pgm.dropConstraint('review_book_post', 'fk_review_book_post.user_posted_users.id');
    pgm.dropTable('review_book_post');
};
