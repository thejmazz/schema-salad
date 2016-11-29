'use strict'

const path = require('path')
const { assert } = require('chai')

const salad = require('../dist/index.js').default

describe('SALAD', function () {
  it('Should log a yaml schema from file', function(done) {
    salad(path.resolve(__dirname, './schema.yaml'))
      .then(() => done())
      .catch(console.error)
  })

  it('Should log a yaml schema from string body', function (done) {
    salad(`
$namespaces:
  acid: "http://example.com/acid#"

$graph:
  - name: ExampleType
    type: record
    fields:
      - name: base
        type: string
        jsonldPredicate: "http://example.com/base"
`.trim()).then(() => done()).catch(console.error)
})

  it('Should log a schema passed as an object', function(done) {
    salad({
      $namespaces: {
        acid: 'http://example.com/acid#'
      },
      $graph: [{
        name: 'ExampleType',
        type: 'record',
        fields: [{
          name: 'base',
          type: 'string',
          jsonldPredicate: 'http://example.com/base'
        }]
      }]
    }).then(() => done())
      .catch(console.error)
  })

  describe('Field name resolution', function () {
    it('Should replace namespace prefix', function(done) {
      salad(path.resolve(__dirname, './schema.yaml'))
        // .then((process) => console.log(process))
        .then((process) => process(path.resolve(__dirname, './field-name-resolution-example.yaml')))
        .then((obj) => done(assert.deepEqual(obj, {
          base: 'one',
          form: {
            "http://example.com/base": 'two',
            "http://example.com/three": 'three'
          },
          'http://example.com/acid#four': 'four'
        })))
        // .then(() => done())
        .catch(console.error)
    })
  })
})
