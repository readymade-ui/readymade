
require('@skatejs/ssr/register');
const render = require('@skatejs/ssr');
const minify = require('html-minifier-terser').minify;
const url = require("url");
const path = require("path");
const fs = require("fs");

const { routes } = require('./../view/index.js');

const indexPath = path.resolve(process.cwd(), "dist", "index.html");
const dom = fs.readFileSync(indexPath).toString();

function generateIndex(template, route, dom){
    let index = dom.replace(`<div id="root"></div>`, `<div id="root">${template}</div>`)
    .replace(/__ssr\(\)/g, '');
    index = minify(index, {
      minifyCSS: true,
      removeComments: true
    });
    return index;
  }

export default async(req, res) => {
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
      const template = await render(preRender);
      res.send(generateIndex(template, route, dom));
    } else {
      res.send(dom);
    }
}