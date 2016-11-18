'use strict'

const path = require('path')
const fs = require('fs-promise')
const yaml = require('js-yaml-promise')
const debug = require('debug')('schema-salad')

module.exports = (filename) =>
  fs.readFile(filename, 'utf8')
  .then((contents) => {
    const ext = path.extname(filename)

    if (ext.match(/\.ya?ml/)) {
      return yaml.safeLoad(contents)
    } else if (ext === '.json') {
      return JSON.parse(contents)
    } else {
      throw new Error('Was not a yaml or json document')
    }
  })
  .then((obj) => {
    console.log('Received: ')
    console.log(JSON.stringify(obj, null, 2))
  })
  .catch(console.error)
