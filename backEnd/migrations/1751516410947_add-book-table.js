/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('books', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        author: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        publisher: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        year: {
            type: 'INTEGER',
            check: 'year >= 1000 AND year <= EXTRACT(YEAR FROM CURRENT_DATE)'
        },
        description: {
            type: 'TEXT',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(50)',
            notNull: true
        }
    })

    pgm.addConstraint('books', 'fk_books.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('books', 'fk_books.genre_genre.id', 'FOREIGN KEY(genre) REFERENCES genre(id) ON DELETE CASCADE')
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropConstraint('books', 'fk_books.owner_users.id');
    pgm.dropConstraint('books', 'fk_books.genre_genre.id');
    pgm.dropTable('books');
};
