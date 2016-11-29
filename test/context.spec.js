'use strict'

const { assert } = require('chai')

const { loadContext } = require('../dist/index.js')

describe('Context', function () {
  it.skip('Should have an implicit context consisting of vocabulary defined by schema and base URI', function () {

  })

  it.skip('base URI in implicit context must be the base URI used to load the document', function () {

  })

  it('Can have an explicity context of document consists of a root object', function () {
    assert.deepEqual(loadContext({
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
    }), {
      $base: undefined,
      $schemas: undefined,
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
    })
  })

  it.skip('Can only have a $graph if the document consists of a root object', function () {

  })

  it.skip('Must ignore other directives beginning with $ that are not context fields', function () {

  })
})
