const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://api.exchangeratesapi.io/',
  timeout: 1000
});

module.exports = instance