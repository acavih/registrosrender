import url from 'url'
import mongoose from 'mongoose'

export default function connectDB (URI_DB: string) {
  const urlDB = new url.URL(URI_DB)
  console.log('Intentando conectar la aplicación a la base de datos de ' + urlDB.host)

  return new Promise((resolve, reject) => {
    mongoose.connect(URI_DB, (err) => {
      if (err) {
        console.log(err)
        console.log(' > No se pudo conectar a la base de datos')
        return reject(err)
      }
      console.log(' > Conexión exitosa')
      resolve(null)
    })
  })
}
