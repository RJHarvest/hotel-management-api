const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

function getRoomsData() {
  return new Promise((resolve, reject) => {
    let arr = []
    fs.createReadStream(path.join(__dirname, 'rooms_15_5_2020.csv'))
      .pipe(csv())
      .on('data', (row) => arr.push(row))
      .on('error', (err) => reject(err))
      .on('end', () => resolve(arr))
  })
}

function getTasksData() {
  return new Promise((resolve, reject) => {
    let arr = []
    fs.createReadStream(path.join(__dirname, 'task_15_5_2020.csv'))
      .pipe(csv())
      .on('data', (row) => arr.push(row))
      .on('error', (err) => reject(err))
      .on('end', () => resolve(arr))
  })
}

module.exports = {
  getRoomsData,
  getTasksData,
}
