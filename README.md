# serverless-json-parser
Simple JSON parser for AWS Lambda + HTTP integration via [serverless-http](https://github.com/dougmoscrop/serverless-http)

## Usage
```js
'use strict'

const jsonParser = require('serverless-json-parser')()
const service = require('restana')()
service.use(jsonParser)


service.post('/create', (req, res) => {
  const payload = req.body

  // ...
})

module.exports = service
```