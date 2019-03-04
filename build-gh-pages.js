const posthtml = require('posthtml');
const inline = require('posthtml-inline');
const minifier = require('htmlnano');
const fs = require('fs');
const path = require('path');

(async () => {
  const input = await fs.readFileSync('dist/index.html', 'utf8');
   const result = posthtml([
     inline({ root: path.join(__dirname, 'dist')} )
  ])
  .process(input);
  const output = await result;
  await fs.writeFile('dist/index.html', output.html, (res, rej) => {
    if (rej) {
      process.exit();
    }
  });
})();