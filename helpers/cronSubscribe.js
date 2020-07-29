const Bull = require('bull')
const sendEmailQue = new Bull('send-email-subscriber')
const sendEmailNodemailer = require('./sendEmail.js')

// producer
function sendEmail (email) {
  sendEmailQue.add({
    email
  }, {
    repeat: {
      jobId: email,
      cron: '*/5 * * * * *',
      limit: 1
    }
  })
}

// consumer
sendEmailQue.process(function(job, done) {
  const { email } = job.data
  sendEmailNodemailer(email)
  done(null, `success sent email to ${email}`)
})

// listener
sendEmailQue.on('completed', function(job, result) {
  console.log('success email >>>>' + result)
})

module.exports = sendEmail