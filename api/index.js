const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = 3000;
const delay = 1000; // responce delay in ms

server.use((req, res, next) => setTimeout(next, delay));
server.use((req, res, next) => {
  next();
});
server.use(middlewares)
server.use(router)
// Modify some route's responces
router.render = function (req, res) {
  if (req.path === '/comments') {
    res.jsonp({
      comments: res.locals.data,
      postid: +req.query.postid
    })
  } else {
    res.jsonp(res.locals.data)
  }
}
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}...`)
})