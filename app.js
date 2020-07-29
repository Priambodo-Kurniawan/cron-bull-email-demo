require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
let sendEmailSub = require('./helpers/cronSubscribe')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.post('/subscribe', (req, res) => {
  let { email } = req.body

  sendEmailSub(email)

  res.json({ msg: 'berhasil kirim email' })
})

app.listen(PORT, _=> console.log(`listening on Port ${PORT}`))