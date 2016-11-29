'use strict'

import * as path from 'path'
const fs = require('fs-promise')
const yaml = require('js-yaml-promise')
const debug = require('debug')('schema-salad')

interface Context {
  $base: string,
  $namespaces: Object,
  $schemas: Array<string>,
  $graph: Array<Object>
}

interface Document {
  $base: string,
  $namespaces: Object,
  $schemas: Array<string>,
  $graph: Array<Object>
}

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

export const loadContext = (document: Document) => {
  const context: Context = {
    $base: document.$base,
    $namespaces: document.$namespaces,
    $schemas: document.$schemas,
    $graph: document.$graph
  }
  console.log('Context: ', context)

  return context
}

const process = (schema) => (input: string) =>
  load(input)
    .then((document) => {
      console.log('Supposed to process:')
      console.log(document)

      const newObj = Object.keys(document).reduce((acc, key) => {
        let keyVal = document[key]

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
    .then((document) => {
      console.log('Received: ')
      console.log(JSON.stringify(document, null, 2))

      loadContext(document)

      return process(document)
    })

export default loadSchema
