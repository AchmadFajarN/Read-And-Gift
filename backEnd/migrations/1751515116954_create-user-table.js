/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createType('user_role', ['user', 'admin']);
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true
        },
        name: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        email: {
            type: 'VARCHAR(50)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'TEXT',
            notNull: true
        },
        location: {
            type: 'TEXT'
        },
        username_ig: {
            type: 'VARCHAR(50)'
        },
        role: {
            type: 'user_role',
            notNull: true,
            default: 'user'
        },
        contact_number: {
            type: 'VARCHAR(20)',
            notNull: true
        },
        joined_at: {
            type: 'TIMESTAMP',
            default: pgm.func('current_timestamp')
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
    pgm.dropType('user_role')
};
