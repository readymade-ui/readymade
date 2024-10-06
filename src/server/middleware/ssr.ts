import fs from 'fs';
import path from 'path';
import { html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { render } from '@lit-labs/ssr';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';

// import * as cheerio from 'cheerio';

const SSR_OUTLET_MARKER = '<!--ssr-outlet-->';
// const HEAD_SCRIPT_OUTLET_MARKER = '<!--head-script-outlet-->';
// const BODY_SCRIPT_OUTLET_MARKER = '<!--body-script-outlet-->';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

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
export default async (req, res) => {
  const routeManifest = JSON.parse(
    fs.readFileSync(resolve('../client/route-manifest.json'), 'utf-8'),
  );
  const indexProd = fs.readFileSync(resolve('../client/index.html'), 'utf-8');
  try {
    let view = {
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
      view = await import(routeTemplateFilePath);
    }
    // const $ = cheerio.load(indexTemplate);
    const modifiedIndexTemplate = indexTemplate; //$.html();
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
};
