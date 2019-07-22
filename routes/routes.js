const router = require('koa-router')();
const queries = require('../db/queries/users');
const koaBody = require('koa-body');

router.get('/users', async function(ctx, next) {
  console.log('get /')
  try {
    const users = await queries.getAllUsers();
    ctx.body = {
      status: 'success',
      data: users
    };
  } catch (err) {
    console.log(err)
  }
})

router.post('/users', koaBody(), async function(ctx, next) {
  try {
  	next();
    const users = await queries.getAllUsers();
	ctx.body = {
		status: 'success',
		data: users
    };
  } catch (err) {
    console.log(err)
  }
})
router.post('/users', koaBody(), async function(ctx, next) {
  try {
  	const name = ctx.request.body.name
  	const password = ctx.request.body.password
	ctx.body.status = validateUser(name, password);
  } catch (err) {
    console.log(err)
  }
})

function validateUser(name, password) {
	return true
}

module.exports = {
	router: router
}