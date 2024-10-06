import { installShimOnGlobal } from './shim';

installShimOnGlobal();

import fs from 'fs';
import path from 'path';
import express from 'express';
import helmet from 'helmet';
import crypto from 'crypto';
// import * as cheerio from 'cheerio';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { render } from '@lit-labs/ssr';

const SSR_OUTLET_MARKER = '<!--ssr-outlet-->';
// const HEAD_SCRIPT_OUTLET_MARKER = '<!--head-script-outlet-->';
// const BODY_SCRIPT_OUTLET_MARKER = '<!--body-script-outlet-->';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function* concatStreams(...readables) {
  for (const readable of readables) {
    for await (const chunk of readable) {
      yield chunk;
    }
  }
}

export const sanitizeTemplate = async (template) => {
  return html`${unsafeHTML(template)}`;
};

async function* renderView(template) {
  yield* render(template);
}

async function createServer(root = process.cwd(), hmrPort = 24678) {
  const app = express();
  const resolve = (p) => path.resolve(__dirname, p);
  const indexProd = fs.readFileSync(resolve('../client/index.html'), 'utf-8');
  // const rootManifest = JSON.parse(
  //   fs.readFileSync(resolve('../client/root-manifest.json'), 'utf-8'),
  // );
  const routeManifest = JSON.parse(
    fs.readFileSync(resolve('../client/route-manifest.json'), 'utf-8'),
  );
  const helmetConfig = {
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: [
          "'self'",
          (req, res) => `'sha256-5+YTmTcBwCYdJ8Jetbr6kyjGp0Ry/H7ptpoun6CrSwQ='`,
        ],
      },
    },
  };

  app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    next();
  });

  app.use(helmet(helmetConfig));

  app.use((await import('compression')).default());
  app.use(
    (await import('serve-static')).default(resolve('../client'), {
      index: false,
    }),
  );

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string,
        render: string,
        view = {
          template: () => '',
        };
      const indexTemplate = fs.readFileSync(
        resolve('../client/index.html'),
        'utf-8',
      );
      let routeDirectoryName = req.baseUrl;
      if (!req.baseUrl.length) {
        routeDirectoryName = '/home';
      }
      if (req.baseUrl === '/home') {
        return res.redirect('/');
      }
      if (
        routeManifest &&
        routeManifest[`app/view${routeDirectoryName}/index.ts`]
      ) {
        let routeTemplateFilePath = '';
        const filePath =
          routeManifest[`app/view${routeDirectoryName}/index.ts`].file;
        routeTemplateFilePath = resolve(`../client/${filePath}`);
        template = indexProd;
        view = await import(routeTemplateFilePath);
      }
      // const $ = cheerio.load(indexTemplate);
      // $('script').each((index, element) => {
      //   $(element).removeAttr('type');
      // });
      let modifiedIndexTemplate = indexTemplate; //$.html();
      const index = modifiedIndexTemplate.indexOf(SSR_OUTLET_MARKER);
      const pre = Readable.from(modifiedIndexTemplate.substring(0, index));
      const post = Readable.from(
        modifiedIndexTemplate.substring(index + SSR_OUTLET_MARKER.length + 1),
      );
      const viewTemplate = await sanitizeTemplate(view.template());
      const ssrResult = renderView(viewTemplate);
      const viewResult = Readable.from(ssrResult);
      const output = Readable.from(concatStreams(pre, viewResult, post));
      res.status(200).set({ 'Content-Type': 'text/html' });
      output.pipe(res);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app };
}

createServer(process.cwd(), 24678).then(({ app }) =>
  app.listen(4444, () => {
    console.log('Serving http://localhost:4444');
  }),
);
