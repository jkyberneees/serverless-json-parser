/* global describe, it */
const expect = require('chai').expect

function createRequest (body, contentType = 'application/json; charset=UTF-8') {
  return {
    headers: {
      'content-type': contentType
    },
    body: body
  }
}

describe('Test Suite', () => {
  const middleware = require('./../index')()

  it('should parse JSON - type string', function (done) {
    const req = createRequest(JSON.stringify({ name: 'Serverless' }))

    middleware(req, {}, () => {})
    expect(req.body.name).to.equals('Serverless')

    done()
  })

  it('should parse JSON - type Buffer', function (done) {
    const req = createRequest(Buffer.from(JSON.stringify({ name: 'Serverless' })))

    middleware(req, {}, () => {})
    expect(req.body.name).to.equals('Serverless')

    done()
  })

  it('should skip parsing', function (done) {
    const req = createRequest(true, 'text/plain')

    middleware(req, {}, () => {})
    expect(req.body).to.equals(true)

    done()
  })

  it('should skip parsing due missing header', function (done) {
    const req = createRequest(true)
    delete req.headers['content-type']

    middleware(req, {}, () => {})

    done()
  })

  it('should fail parsing with 415 error code', function (done) {
    const req = createRequest(true)
    const res = { statusCode: 200, end: () => {} }

    middleware(req, res, () => {})
    expect(res.statusCode).to.equals(415)

    done()
  })
})
