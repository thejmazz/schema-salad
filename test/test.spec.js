'use strict'

const path = require('path')
const { assert } = require('chai')

const salad = require('../dist/index.js')

describe('SALAD', function () {
  it('Should log a json thing', function(done) {
    salad(path.resolve(__dirname, './schema.json'))
      .then(() => done())
      .catch(console.error)
  })

  it('Should log a yaml thing', function(done) {
    salad(path.resolve(__dirname, './schema.yaml'))
      .then(() => done())
      .catch(console.error)
  })

  describe('Field name resolution', function () {
    it.only('Should replace namespace prefix', function(done) {
      salad(path.resolve(__dirname, './schema.yaml'))
        // .then((process) => console.log(process))
        .then((process) => process(path.resolve(__dirname, './field-name-resolution-example.json')))
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
