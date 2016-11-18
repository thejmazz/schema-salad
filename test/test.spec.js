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
})
