const publicIp = require('public-ip');
const api = require('./api')

publicIp.v4().then((ip) => {
    api.listDnsRecords().then(records => {
        api.updateRecordIP(records, ip)
    })
})

