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
    'X-Auth-Key':  API_KEY,
}

/**
 * listDnsRecords is a promise array of 'A' DNS records
 * 
 */
function listDnsRecords() {
    let requestUrl = BASE_URL 
        + 'zones/' 
        + ZONE 
        + '/dns_records?type=A&per_page=100'

    return fetch(requestUrl, {
        headers: AUTH_HEADERS
    }).then((res) => res.json()
    ).then((res) => {
        return Promise.resolve(res.result)
    })
}

/**
 * 
 * @param {*} records an array of records to update, from listDnsRecords
 * @param {*} newIp the new IP address to update 
 */
function updateRecordIP(records, newIp) {
    return Promise.all(
        records.map(record => updateSingleRecord(record, newIp))
    )
}

/**
 * Update a single record
 * @param {*} record the record to update, from listDnsRecords
 * @param {*} newIp the new IP address
 * @returns the result
 */
function updateSingleRecord(record, newIp) {
    let requestUrl = BASE_URL + 'zones/' + ZONE + '/dns_records/' + record.id

    let bodyObj = {
        type: record.type,
        name: record.name,
        content: newIp,
        ttl: record.ttl,
        proxied: record.proxied
    }

    return fetch(requestUrl, {
        method: 'PUT',
        body: JSON.stringify(bodyObj),
        headers: {
            ...AUTH_HEADERS,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

module.exports = {
    listDnsRecords,
    updateRecordIP
}