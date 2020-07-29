const CronJob = require('cron').CronJob;

const jobMemasak = new CronJob('*/5 * * * * *', function() {
  console.log('cron tiap 5 detik >>>> jobMemasak')
}, null, false, 'Asia/Jakarta');

module.exports = jobMemasak