'use strict';

var dbm;
var type;
var seed;
const { getRoomsData, getTasksData } = require('./fixed-data/data')

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  console.log('----- [UPGRADE SCRIPT] -----');
  console.log('----- Insert fixed data -----');

  const roomsArr = await getRoomsData()
  const tasksArr = await getTasksData()

  const rooms = roomsArr.map(({ room_number,room_type,room_capacity,price_rate }) => {
    return `('${room_number}','${room_type}',${room_capacity},${price_rate})`
  })
  const tasks = tasksArr.map(({ task }) => {
    return `('${task}')`
  })

  const SQL = `
    INSERT INTO task
      (task)
    VALUES
      ${tasks.join()};

    INSERT INTO rooms
      (room_number,room_type,room_capacity,price_rate)
    VALUES
      ${rooms.join()};
  `;

  console.log(`Running... SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports.down = function(db) {
  console.log('----- [DOWNGRADE SCRIPT] -----');
  console.log('----- Insert fixed data -----');

  const SQL = `
    DELETE FROM task
    WHERE 
      task = 'change bedsheets' OR
      task = 'restock minibar' OR
      task = 'extra pillow' OR
      task = 'restock toiletries';

    DELETE FROM rooms
    WHERE
      room_type = 'deluxe room' OR
      room_type = 'premium room' OR
      room_type = 'sea view room' OR
      room_type = 'executive suite' OR
      room_type = 'presidential suite';
  `;

  console.log(`Running... SQL: ${SQL}`);
  return db.runSql(SQL);
};

exports._meta = {
  "version": 1
};
