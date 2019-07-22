const koa = require('koa');
const router = require('koa-router')();

const app = new koa();

app.use(router.routes());

router.get('/login', function(ctx, next) {
   next()
   if (ctx.status != 200){
      ctx.body = "hey, hello"
   }
});


const server = app.listen(3000, function(){
	console.log("Server  running")
});

module.exports = server;
