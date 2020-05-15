const csv = require('csv-to-array')
const path = require('path')

const roomsCsvPath = path.join(__dirname, 'rooms_15_5_2020.csv')
const tasksCsvPath = path.join(__dirname, 'task_15_5_2020.csv')

const roomColumns = ['room_number','room_type','room_capacity','price_rate']
const taskColumns = ['task']

let roomsData = []

/*const t = () => {
  const a = csv({
    file: roomsCsvPath,
    columns: roomColumns
  }, async (err, data) => {
    return await data
    console.log(data)
  })
  console.log(a)
}

csv({
  file: roomsCsvPath,
  columns: roomColumns
}, (err, data) => {
  roomsData = [...data]
})

const tasksData = csv({
  file: tasksCsvPath,
  columns: taskColumns
}, (err, data) => {
  return data
})
*/




const fs = require('fs')
const { convertCSVToArray } = require('convert-csv-to-array')
const converter = require('convert-csv-to-array')
const neatCsv = require('neat-csv')

const b = async () => {
  try {
    const data = await fs.readFileSync(tasksCsvPath, {encoding:'utf8', flag:'r'})
    console.log(data)
    const b = await neatCsv(data)
    console.log(b)
    return b
  } catch(e) {
    console.error(e)
  }
}

const a = fs.readFile('./task_15_5_2020.csv', async (err, data) => {
  let test
  if (err) {
    console.error(err)
    return
  }
  test = await neatCsv(data)
})

//const arrayofObjects = convertCSVToArray(data, {
//  separator: ',',
//})

//console.log(arrayofObjects)
















/*module.exports = {
  roomsData,
  tasksData,
}*/
