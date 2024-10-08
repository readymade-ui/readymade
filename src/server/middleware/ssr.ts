import fs from 'fs';
import path from 'path';
import he from 'he';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { render } from '@lit-labs/ssr';
import { Readable } from 'stream';
import { minify } from 'html-minifier-terser';
import { ViteDevServer } from 'vite';

import { config } from '../config.js';

import * as cheerio from 'cheerio';

interface View {
  render: () => string;
}

const SSR_OUTLET_MARKER = '<!--ssr-outlet-->';
const GLOBAL_STYLE_MARKER = '<!--style-outlet-->';

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

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf-8');
}

async function renderStream(stream) {
  return await streamToString(Readable.from(stream));
}

async function* renderView(template) {
  yield* render(template);
}

function isRoute(req): boolean {
  const baseUrl = req.baseUrl.split('/')[1]; // Get the first segment of the baseUrl
  const isRouteSegment = !/\.[^/.]+$/.test(baseUrl); // Check if it does not contain a file extension
  return isRouteSegment;
}

function readFilesSync(filePaths) {
  const results = filePaths.map((path) => {
    const content = fs.readFileSync(path, 'utf-8');
    return content;
  });
  return results;
}

const ssrMiddleware = (options?: { vite?: ViteDevServer }) => {
  return async (req, res, next) => {
    let routeDirectoryName: string;

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
        render: () => '',
      };
      let template: string, filePath: string, routeTemplateFilePath: string;
      let stylesheets;

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
        const indexManifest = JSON.parse(
          fs.readFileSync(resolve('dist/client/manifest-index.json'), 'utf-8'),
        );
        if (manifest && manifest[`app/view/${routeDirectoryName}/index.ts`]) {
          filePath = manifest[`app/view/${routeDirectoryName}/index.ts`].file;
          routeTemplateFilePath = resolve(`dist/client/${filePath}`);
          view = (await import(routeTemplateFilePath)) as View;
        }
        if (indexManifest && indexManifest[`index.html`].css) {
          stylesheets = readFilesSync(
            indexManifest[`index.html`].css.map((path) =>
              resolve(`dist/client/${path}`),
            ),
          )
            .map((stylesheet) => `<style>${stylesheet}</style>`)
            .join('\n')
            .trim()
            .concat('\n');
        }
      }

      // if you need to modify the index template here
      const $ = cheerio.load(template);
      template = $.html();

      if (env === 'production') {
        $('[rel="stylesheet"]').remove();
        template = $.html();
        const styleIndex = template.indexOf(GLOBAL_STYLE_MARKER);
        const preStyle = Readable.from(template.substring(0, styleIndex));
        const postStyle = Readable.from(
          template.substring(styleIndex + GLOBAL_STYLE_MARKER.length + 1),
        );
        const styleResult = Readable.from(stylesheets);
        template = await renderStream(
          Readable.from(concatStreams(preStyle, styleResult, postStyle)),
        );
      }

      const ssrIndex = template.indexOf(SSR_OUTLET_MARKER);
      const preSSR = Readable.from(template.substring(0, ssrIndex));
      const postSSR = Readable.from(
        template.substring(ssrIndex + SSR_OUTLET_MARKER.length + 1),
      );
      const viewTemplate =
        env === 'development' ? view.render() : view.render();
      const ssrResult = await renderView(viewTemplate);
      const viewResult = await renderStream(ssrResult);

      const output = await renderStream(
        Readable.from(concatStreams(preSSR, viewResult, postSSR)),
      );

      if (env === 'production') {
        if (config.ignoreHTMLMinify?.has(routeDirectoryName)) {
          res.status(200).send(he.decode(output));
        } else {
          minify(he.decode(output), {
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
          }).then((html) => {
            res.status(200).send(html);
          });
        }
      } else {
        res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .send(he.decode(output));
      }
    } catch (e) {
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  };
};

export { ssrMiddleware };
