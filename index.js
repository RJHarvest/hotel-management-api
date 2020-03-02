const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// routes
app.get('/', (req, res) => {
  res.send({ status: 'up' })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
