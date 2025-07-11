/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createType('user_role', ['admin', 'user']);
    pgm.createTable("users", {
        id: {
            primaryKey: true,
            type: 'VARCHAR(50)'
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true
        },
        fullname: {
            type: 'TEXT',
            notNull: true
        },
        address: {
            type: 'TEXT',
            notNull: true
        },
        joined_at: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        photo_profile_url: {
            type: 'TEXT',
        },
        role: {
            type: 'user_role',
            notNull: true,
            default: 'user'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropType('user_role');
};
