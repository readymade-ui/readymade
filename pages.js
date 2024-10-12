const posthtml = require('posthtml');
const inline = require('posthtml-inline');
const fs = require('fs');
const path = require('path');

const replace = (str) => {
  return new Promise((res, rej) => {
    try {
      str = str.replace(`//# sourceMappingURL=web-animations.min.js.map`, '');
      res(str);
    } catch (err) {
      rej(err);
    }
  });
};

(async () => {
  let input = await fs.readFileSync('dist/client/index.html', 'utf8');
  input = input.replace('<head>', '<head><base href="/readymade">');
  const result = posthtml([
    inline({ root: path.join(__dirname, 'dist', 'client') }),
  ]).process(input);
  const output = await result;
  const filtered = await replace(output.html);
  fs.writeFile('dist/client/index.html', filtered, (res, rej) => {
    if (rej) {
      process.exit();
    }
  });
})();
