import axios from 'axios'

const config = require('../../app.json')

export function ajaxCall (options, successHandler, errorHandler) {
  axios({
    ...options,
    url: `${config.serverUrl}/${options.url}`
  }).then(response => {
    if (successHandler) {
      successHandler(response)
    }
  }).catch(error => {
    if (errorHandler) {
      errorHandler(error)
    }
  })
}
