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
  console.log('----- Create Tables -----');
  
  const SQL = `
    CREATE TABLE IF NOT EXISTS guests (
      id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(255) NULL,
      last_name VARCHAR(255) NULL,
      passport_number VARCHAR(255) NULL,
      phone_number VARCHAR(20) NULL,
      email VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS staff (
      id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(255) NULL,
      last_name VARCHAR(255) NULL,
      role ENUM('front_desk','room_service','kitchen','manager') NOT NULL DEFAULT 'front_desk',
      username VARCHAR(255) NULL,
      password VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS menu (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NULL,
      description VARCHAR(255) NULL,
      price DECIMAL(10,2) NULL,
      image VARCHAR(255) NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      start_date TIMESTAMP NULL,
      end_date TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS task (
      id INT PRIMARY KEY AUTO_INCREMENT,
      task VARCHAR(255) NULL
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS rooms (
      id INT PRIMARY KEY AUTO_INCREMENT,
      room_number VARCHAR(10) NULL,
      room_type ENUM('deluxe room','premium room','sea view room','executive room','executive suite','royal suite','presidential suite') NULL,
      price_rate DECIMAL(10,2) NULL
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS menu_orders (
      id INT PRIMARY KEY AUTO_INCREMENT,
      room_id INT NOT NULL,
      menu_id INT NOT NULL,
      status ENUM('pending','in_progress','done') NOT NULL DEFAULT 'pending',
      remarks VARCHAR(255) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms(id),
      FOREIGN KEY (menu_id) REFERENCES menu(id)
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS reservations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      guest_id INT NOT NULL,
      room_id INT NOT NULL,
      check_in TIMESTAMP NULL,
      check_out TIMESTAMP NULL,
      status ENUM('checked_in','checked_out','reserved') NOT NULL DEFAULT 'reserved',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (guest_id) REFERENCES guests(id),
      FOREIGN KEY (room_id) REFERENCES rooms(id)
    ) ENGINE=innodb;

    CREATE TABLE IF NOT EXISTS room_services (
      id INT PRIMARY KEY AUTO_INCREMENT,
      room_id INT NOT NULL,
      task_id INT NOT NULL,
      status ENUM('pending','in_progress','done') NOT NULL DEFAULT 'pending',
      remarks VARCHAR(25) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (room_id) REFERENCES rooms(id),
      FOREIGN KEY (task_id) REFERENCES task(id)
    ) ENGINE=innodb;
  `;

  console.log(`Running SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports.down = function(db) {
  console.log('----- [DOWNGRADE SCRIPT] -----');
  console.log('----- Create Tables -----');

  const SQL = `
    DROP TABLE IF EXISTS guests;
    DROP TABLE IF EXISTS staff;
    DROP TABLE IF EXISTS menu;
    DROP TABLE IF EXISTS task;
    DROP TABLE IF EXISTS rooms;
    DROP TABLE IF EXISTS menu_orders;
    DROP TABLE IF EXISTS reservations;
    DROP TABLE IF EXISTS room_services;
  `;

  console.log(`Running SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports._meta = {
  "version": 1
};
