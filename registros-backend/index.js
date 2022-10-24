require('dotenv/config')
const http = require('http')
const connectTODB = require('./db/connectDB')
const PORT = process.env.PORT

connectTODB().then(() => {
  const server = http.createServer(require('./app'))

  server.listen(PORT, () => {
    console.log('El servidor esta escuchando en el puerto ' + PORT)
  })
}).catch((err) => {
  console.log(err)
  console.log('Cerrando el programa...')
})
