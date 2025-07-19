/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.dropColumn('users', 'photo_profile_url');
    pgm.createTable("image_profile_url", {
        id: {
            primaryKey: true,
            type: 'VARCHAR(50)'
        },
        url: {
            type: 'TEXT',
            unique: true
        }, 
        user_id: {
            type: 'VARCHAR(100)',
            notNull: true,
            references: 'users(id)',
            unique: true,
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
    pgm.addColumn('users', {
        photo_profile_url: {
            type: 'TEXT'
        }
    });

    pgm.dropTable('image_profile_url')
};
