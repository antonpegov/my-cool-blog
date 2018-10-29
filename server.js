const 
  Koa = require('koa'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js'),
  compiler = webpack(webpackConfig),
  port = process.env.PORT || '4000',
  staticMw = require('koa-static')('./docs/'),
  devMw = require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true, 
    publicPath: webpackConfig.output.publicPath, 
    stats: { colors: true }
  }),
  // hotMw = require('webpack-hot-middleware')(compiler),
  app = new Koa();

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  app.use(staticMw);
  app.use(devMw);
  // app.use(hotMw);
  app.use(function* (next) {
    yield require('webpack-hot-middleware')(compiler).bind(null, this.req, this.res)
    yield next
  })
})