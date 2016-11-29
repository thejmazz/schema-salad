'use strict'

import * as path from 'path'
const fs = require('fs-promise')
const yaml = require('js-yaml-promise')
const debug = require('debug')('schema-salad')

const load = (input: string | Object) => {
  if (typeof(input) === 'object') {
    return Promise.resolve(input)
  }

  if (input.indexOf('\n') !== -1) {
    return yaml.safeLoad(input)
  } else {
    return fs.readFile(input).then(contents => yaml.safeLoad(contents))
  }
}

const process = (schema) => (input: string) =>
  load(input)
    .then((obj) => {
      console.log('Supposed to process:')
      console.log(obj)

      const newObj = Object.keys(obj).reduce((acc, key) => {
        let keyVal = obj[key]

        if (/^\w+:\w+$/.test(key)) {
          console.log('Caught: ', key)
          console.log('Can we match it?')
          console.log(schema.$namespaces)
          console.log('Matches to:')
          const nspace = key.replace(/:\w+/, '')
          console.log(schema.$namespaces[nspace])

          key = key.replace(/^\w+:/, schema.$namespaces[nspace])
        }

        return Object.assign({}, acc, { [key]: keyVal })
      }, {})

      console.log('Made:')
      console.log(JSON.stringify(newObj, null, 2))

      return newObj
    })

const loadSchema = (input: string | Object) =>
  load(input)
    .then((obj) => {
      console.log('Received: ')
      console.log(JSON.stringify(obj, null, 2))

      return process(obj)
    })

module.exports = loadSchema
