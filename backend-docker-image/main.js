const express = require('express')
const path = require('path')

const app = express()

const messages = {
  403: 'You shall not pass! - Forbidden',
  404: 'Nothing to see here... - Not Found',
  500: 'Seems like a server error. - Internal Server Error',
  502: 'Server said "Bad Gateway". - Bad Gateway',
  503: 'The computer said - No - Service unavailable '
}

app.get('/healthz', (req, res) => res.sendStatus(200))

app.get('/', (req, res) => {
  console.log(req.headers)

  const code = (req.headers['x-code'] !== undefined) ? req.headers['x-code'] : 404
  let errorPage

  if (req.headers['x-format'] === 'application/json') {
    errorPage = {
      code,
      message: messages[code]
    }

    return res.status(code).send(errorPage)
  }

  console.log(code)
  console.log(errorPage)

  return res.status(code).sendFile(path.join(__dirname, `./${code}.html`))
})

app.listen(3000)
