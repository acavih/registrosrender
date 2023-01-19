const mongoose = require('mongoose');
const url = require('url')

mongoose.Promise = global.Promise;

// Connect MongoDB at default port 27017.
const connectTODB = () => new Promise((resolve, reject) => {
  const urlDB = process.env.URL_DB || 'mongodb://localhost/registros'
  const uri = new url.URL(urlDB)
  console.log('Conectando a la base de datos de ' + uri.host)
  mongoose.connect(urlDB, {
    useNewUrlParser: true
  }, (err) => {
    if (err) {
      console.log(err.message)
      reject(err)
    }
    console.log(' -> Se ha podido conectar con éxito')
    resolve()
  });
})

module.exports = connectTODB
