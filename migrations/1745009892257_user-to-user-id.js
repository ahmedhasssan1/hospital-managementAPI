/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
up = (pgm) => {
    pgm.sql(`
        ALTER TABLE doctor
        RENAME COLUMN "userIdId" TO "user_id";
      `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
down = (pgm) => {
    pgm.sql(`
        ALTER TABLE doctor
        RENAME COLUMN "user_id" TO "userIdId";
      `);

};
