import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

// Configuración de rutas del sistema de archivos
const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual

// Creación del servidor HTTP
const server = createServer((req, res) => {
  const { method, url } = req

  // Manejo de solicitudes GET
  if (method === 'GET') {
    if (url === '/') {
      // TODO: Servir el archivo home.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      const filePath = join(__dirname, 'views', 'home.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } 
    else if (url === '/login') {
      // TODO: Servir el archivo login.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      const filePath = join(__dirname, 'views', 'login.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } 
    else if (url === '/register') {
      // TODO: Servir el archivo register.html desde la carpeta views
      // 1. Usar readFile para leer el archivo
      // 2. Establecer el Content-Type correcto
      // 3. Enviar el contenido al cliente
      const filePath = join(__dirname, 'views', 'register.html')
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500)
          res.end('Error interno del servidor')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
    } 
    else {
      // TODO: Servir archivos estáticos desde la carpeta public (imágenes y CSS)
      // 1. Usar join para construir la ruta del archivo
      // 2. Usar readFile para leer el archivo
      // 3. Establecer el Content-Type usando getContentType
      // 4. Enviar el contenido al cliente
      const filePath = join(__dirname, 'public', url)
      readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(404)
          res.end('Archivo no encontrado')
          return
        }
        const contentType = getContentType(filePath)
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
      })
    }
  }
  // Manejo de solicitudes POST
  else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // TODO: Redirigir al usuario a la página de inicio
      // 1. Establecer el código de estado 302
      // 2. Establecer el header Location: '/'
      // 3. Finalizar la respuesta
      res.writeHead(302, { Location: '/' })
      res.end()
    } 
    else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404)
      res.end('Ruta no encontrada')
    }
  }
})

// Configuración del puerto del servidor
const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en localhost:${PORT}`)
})
