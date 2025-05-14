/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
up = (pgm) => {
  pgm.sql(`
    CREATE TABLE bills (
      id SERIAL PRIMARY KEY,
      patient_id INTEGER,
      name TEXT,
      amount NUMERIC
    );
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
down = (pgm) => {
  pgm.sql(`
    DROP TABLE bills;
  `);
};
