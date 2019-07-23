const router = require('koa-router')();
const queries = require('../db/queries/users');
const koaBody = require('koa-body');
const validateUser = require('./utils').validateUser;
const encryptPwd = require('./utils').encryptPwd;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const publicKEY  = fs.readFileSync('./public.key', 'utf8');
const privateKEY  = fs.readFileSync('./private.key', 'utf8');

const i  = 'Mysoft corp';          // Issuer 
const s  = 'some@user.com';        // Subject 
const a  = 'http://mysoftcorp.in'; // Audience

const signOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  "HS256"
};

var verifyOptions = {
 issuer:  i,
 subject:  s,
 audience:  a,
 expiresIn:  "12h",
 algorithm:  ["HS256"]
};


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

router.post('/new_user', koaBody(), async function(ctx, next) {
  try {
    console.log('/new_user')
    console.log(ctx.request.body)
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = encryptPwd(password)
    console.log(name, hash)
    await queries.insertNewUser(name, hash)
    ctx.body = {
      status: "success"
    };
  } catch (err) {
    console.log(err)
    ctx.body = {
      status: "failed"
    };
  }
})

router.post('/validate_user', koaBody(), async function(ctx, next) {
  try {
    console.log('/validate_user')
    console.log(ctx.request.body)
    const token = jwt.sign(ctx.request.body, privateKEY, signOptions);
    ctx.body = {
      token: token
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      status: 'failed'
    };
  }
})

router.post('/login', koaBody(), async function(ctx, next) {
  try {
    console.log('/login')
    const token = jwt.verify(ctx.request.body.token, publicKEY, verifyOptions);
    console.log(token)
    const name = ctx.request.body.name
    const password = ctx.request.body.password
    const hash = await queries.getUserPwd(name)
    if (validateUser(password, hash)) {
      ctx.body = {
      status: 'success'
    };
    } else {
      ctx.body = {
      status: 'failed'
    };
    }

  } catch (err) {
    console.log(err);
    ctx.body = {
      status: 'failed'
    };
  }
})

module.exports = {
  router: router
}