const koa = require('koa');
const router = require('koa-router')();

const app = new koa();

app.use(router.routes());

router.get('/', function(ctx, next) {
   console.log("hi")
   ctx.body = "hey, hello"
});

router.post('/', function (req, res) {
  console.log(ctx.body);
});


const server = app.listen(4000, function(){
	console.log("Server running")
});

module.exports = server;
