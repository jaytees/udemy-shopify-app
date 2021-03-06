require('isomorphic-fetch');
// import necessary dependancies
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();
// import the Shopify API GraphQlProxy
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

// create port variable
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// bring in the env variables
const { SHOPIFY_API_SECRET, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  // create server instance
  const server = new Koa();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET];

  //   set up server
  server.use(
    //   pass in key and secret for auth
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      //   scopes is something you need to modify
      scopes: ['read_products', 'write_products', 'read_script_tags', 'write_script_tags'],
      accessMode: 'offline',
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        // set our cookies
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          signed: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      }
    })
  );

  server.use(graphQLProxy({ version: ApiVersion.October19 }));
  server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
