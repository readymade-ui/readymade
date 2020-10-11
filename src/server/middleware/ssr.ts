require('@skatejs/ssr/register');
const render = require('@skatejs/ssr');
const minify = require('html-minifier-terser').minify;
const url = require('url');
const path = require('path');
const fs = require('fs');

const { routes } = require('./../view/index.js');

const indexPath = path.join(process.cwd(), 'dist', 'client', 'index.html');
const dom = fs.readFileSync(indexPath).toString();

function generateIndex(template, route, dom){
  let index = dom
  .replace(`<div id="root"></div>`, `<div id="root">${template}</div>`)
  .replace(/__ssr\(\)/g, '');
  if (route.schema) {
    index = index.replace(`<script type="application/ld+json"></script>`, `<script type="application/ld+json">${route.schema}</script>`);
  } else {
    index = index.replace(`<script type="application/ld+json"></script>`, ``);
  }
  index = minify(index, {
    minifyCSS: true,
    removeComments: true
  });
  return index;
}

export default async(req, res, next) => {
  let component: any = class {};
  const route = routes.find(rt => rt.path === url.parse(req.url).pathname);
  if (route == undefined) {
    res.redirect(301, '/404');
    return;
  } else {
    component = route.component;
  }
  if (component) {
    const preRender = new component();
    if (preRender.getModel) {
      try {
        await preRender.getModel();
      } catch(e) {
        next(e);
      }
    }
    const template = await render(preRender);
    res.send(generateIndex(template, route, dom));
  } else {
    res.send(dom);
  }
}
