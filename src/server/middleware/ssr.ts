import fs from 'fs';
import path from 'path';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { render } from '@lit-labs/ssr';
import { Readable } from 'stream';
import { ViteDevServer } from 'vite';

// import * as cheerio from 'cheerio';

interface View {
  template: () => string;
}

const SSR_OUTLET_MARKER = '<!--ssr-outlet-->';

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

function isRoute(req): boolean {
  const baseUrl = req.baseUrl.split('/')[1]; // Get the first segment of the baseUrl
  const isRouteSegment = !/\.[^/.]+$/.test(baseUrl); // Check if it does not contain a file extension
  return isRouteSegment;
}

const ssrMiddleware = (options?: { vite?: ViteDevServer }) => {
  return async (req, res, next) => {
    let routeDirectoryName: string;
    console.log(req.baseUrl);
    if (req.baseUrl === '/home') {
      return res.redirect('/');
    }

    if (!isRoute(req)) {
      next();
    }

    if (!req.baseUrl.length) {
      routeDirectoryName = 'home';
    } else {
      routeDirectoryName = req.baseUrl.split('/')[1];
    }

    const url = req.originalUrl;
    const vite = options.vite;
    const env: string = process.env.NODE_ENV || 'development';
    const root = process.cwd();
    const resolve = (p) => path.resolve(root, p);

    try {
      let view: View = {
        template: () => '',
      };
      let template: string, filePath: string, routeTemplateFilePath: string;

      if (env === 'development') {
        template = fs.readFileSync(resolve('src/client/index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        filePath = `app/view/${routeDirectoryName}/index.ts`;
        routeTemplateFilePath = resolve(`src/client/${filePath}`);
        view = (await vite.ssrLoadModule(routeTemplateFilePath)) as View;
      } else {
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
        const manifest = JSON.parse(
          fs.readFileSync(resolve('dist/client/manifest.json'), 'utf-8'),
        );
        if (manifest && manifest[`app/view/${routeDirectoryName}/index.ts`]) {
          filePath = manifest[`app/view/${routeDirectoryName}/index.ts`].file;
          routeTemplateFilePath = resolve(`dist/client/${filePath}`);
          view = (await import(routeTemplateFilePath)) as View;
        }
      }

      // if you need to modify the index template here
      // const $ = cheerio.load(template);
      // template = $.html();

      const index = template.indexOf(SSR_OUTLET_MARKER);
      const pre = Readable.from(template.substring(0, index));
      const post = Readable.from(
        template.substring(index + SSR_OUTLET_MARKER.length + 1),
      );
      const viewTemplate =
        env === 'development'
          ? view.template()
          : await sanitizeTemplate(view.template());
      const ssrResult = renderView(viewTemplate);

      const viewResult = Readable.from(ssrResult);
      const output = Readable.from(concatStreams(pre, viewResult, post));
      res.status(200).set({ 'Content-Type': 'text/html' });
      output.pipe(res);
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  };
};

export { ssrMiddleware };
