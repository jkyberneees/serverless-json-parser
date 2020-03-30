const middleware = require('../index')()
const req = {
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({ name: 'Serverless' })
}

middleware(req, {}, () => {
  console.log(req.body) // parsed JSON object
})
