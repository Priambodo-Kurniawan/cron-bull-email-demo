const sendEmail = require('./sendEmail')
const Bull = require('bull')

const queueSendEmail = new Bull('send-email')

// producer
function sendEmailSub (email) {
    queueSendEmail.add({
        email
    }, {
        repeat: {
            jobId: email,
            cron: '*/5 * * * * *',
            limit: 2
        }
    })
}

// consumer
queueSendEmail.process(function (job, done) {
    const { email } = job.data
    sendEmail(email)
    done(null, `email sent to ${email}`)
})

// listener
queueSendEmail.on('completed', function (job, result) {
    console.log(result)
})

module.exports = sendEmailSub