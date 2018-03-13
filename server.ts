// **Server-Side Rendering(ssr)**
// * Happens at runtime
// * Uses `ngExpressEngine` to render your application on the fly at the requested url.

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as bodyParser from 'body-parser';

import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const json_body_parser = bodyParser.json();
const urlencoded_body_parser = bodyParser.urlencoded({ extended: true });

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.use(json_body_parser);
app.use(urlencoded_body_parser);

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get(
  '*.*',
  express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
  })
);

// ALl regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

app.post('/users', function(req, res) {
  console.log(`Server log - HTTP users`, req.body);
  res.status(200).send({ users: ['A', 'B', 'C'] });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
