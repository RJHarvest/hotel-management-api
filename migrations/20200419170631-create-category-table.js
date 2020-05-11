'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  console.log('----- [UPGRADE SCRIPT] -----');
  console.log('----- Create Category Table -----');
  
  const SQL = `
    CREATE TABLE IF NOT EXISTS category (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=innodb;
  `;

  console.log(`Running SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports.down = function(db) {
  console.log('----- [DOWNGRADE SCRIPT] -----');
  console.log('----- Create Category Table -----');

  const SQL = `
    DROP TABLE IF EXISTS category;
  `;

  console.log(`Running SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports._meta = {
  "version": 1
};
