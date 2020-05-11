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

exports.up = function(db, callback) {
  console.log('----- [UPGRADE SCRIPT] -----');
  console.log('----- Add Category ID foreign key-----');
  
  const SQL = `
    SET @dbname = DATABASE();
    SET @tablename = "menu";
    SET @columnname = "category_id";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      "SELECT 1",
      CONCAT("ALTER TABLE ", @tablename, " ADD ", @columnname, " INT(11) NOT NULL AFTER id;")
    ));
    PREPARE alterIfNotExists FROM @preparedStatement;
    EXECUTE alterIfNotExists;
    DEALLOCATE PREPARE alterIfNotExists;

    SET @dbname = DATABASE();
    SET @tablename = "menu";
    SET @columnname = "category_id";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      "ALTER TABLE menu ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES category(id);",
      "SELECT 1"
    ));
    PREPARE alterIfExists FROM @preparedStatement;
    EXECUTE alterIfExists;
    DEALLOCATE PREPARE alterIfExists;
  `;

  console.log(`Running... SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports.down = function(db) {
  console.log('----- [DOWNGRADE SCRIPT] -----');
  console.log('----- Add Category ID foreign key-----');

  const SQL = `
    SET @dbname = DATABASE();
    SET @tablename = "menu";
    SET @columnname = "category_id";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      CONCAT("ALTER TABLE ", @tablename, " DROP FOREIGN KEY ", @columnname, ";"),
      "SELECT 1"
    ));
    PREPARE alterIfExists FROM @preparedStatement;
    EXECUTE alterIfExists;
    DEALLOCATE PREPARE alterIfExists;
    
    SET @dbname = DATABASE();
    SET @tablename = "menu";
    SET @columnname = "category_id";
    SET @preparedStatement = (SELECT IF(
      (
        SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
        WHERE
        (table_name = @tablename)
        AND (table_schema = @dbname)
        AND (column_name = @columnname)
      ) > 0,
      CONCAT("ALTER TABLE ", @tablename, " DROP ", @columnname, ";"),
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
