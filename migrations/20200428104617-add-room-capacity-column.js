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
  console.log('----- Add room capacity column -----');

  const SQL = `
    SET @dbname = DATABASE();
    SET @tablename = "rooms";
    SET @columnname = "room_capacity";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      "SELECT 1",
      CONCAT("ALTER TABLE ", @tablename, " ADD ", @columnname, " INT(1) NULL DEFAULT NULL AFTER room_type;")
    ));
    PREPARE alterIfNotExists FROM @preparedStatement;
    EXECUTE alterIfNotExists;
    DEALLOCATE PREPARE alterIfNotExists;
  `;

  console.log(`Running... SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports.down = function(db) {
  console.log('----- [DOWNGRADE SCRIPT] -----');
  console.log('----- Add room capacity column -----');

  const SQL = `
    SET @dbname = DATABASE();
    SET @tablename = "rooms";
    SET @columnname = "room_capacity";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      CONCAT("ALTER TABLE ", @tablename, " DROP ", @columnname),
      "SELECT 1"
    ));
    PREPARE alterIfExists FROM @preparedStatement;
    EXECUTE alterIfExists;
    DEALLOCATE PREPARE alterIfExists;
  `;

  console.log(`Running... SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports._meta = {
  "version": 1
};
