const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3000;
const delay = 1000; // responce delay in ms

server.use((req, res, next) => setTimeout(next, delay));
server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}...`)
})