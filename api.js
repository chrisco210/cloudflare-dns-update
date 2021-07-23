const config = require('./config.js')
const fetch = require('node-fetch');
const { request } = require('http');

const API_TOKEN = config.API_TOKEN
const API_KEY = config.API_KEY
const EMAIL = config.EMAIL
const BASE_URL = config.BASE_URL
const ZONE = config.ZONE

const AUTH_HEADERS = {
    'X-Auth-Email': EMAIL,
    'X-Auth-Key':  API_KEY
}

/**
 * listDnsRecords is a promise array of 'A' DNS records
 * 
 */
function listDnsRecords() {
    let requestUrl = BASE_URL + 'zones/' + ZONE + '/dns_records?type=A&per_page=100'

    return fetch(requestUrl, {
        headers: AUTH_HEADERS
    }).then((res) => res.json()
    ).then((res) => {
        return Promise.resolve(res.result)
    })
}

/**
 * 
 * @param {*} identifiers an array of identifiers 
 * @param {*} newIp the new IP address to update 
 */
async function updateRecordIP(identifiers, newIp) {

}

module.exports = {
    listDnsRecords,
    updateRecordIP
}