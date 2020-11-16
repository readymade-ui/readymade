const posthtml = require('posthtml');
const inline = require('posthtml-inline');
const minifier = require('htmlnano');
const fs = require('fs');
const path = require('path');

const replace = (str) => {
 return new Promise((res,rej) => {
   try {
	str = str.replace(`//# sourceMappingURL=web-animations.min.js.map`, '');
	res(str);
   }
   catch(err) {
	 rej(err);
   }
 });
}



(async () => {
  const input = await fs.readFileSync('dist/index.html', 'utf8');
   const result = posthtml([
	 inline({ root: path.join(__dirname, 'dist')} )
  ])
  .process(input);
  const output = await result;
  const filtered = await replace(output.html);
  fs.writeFile('dist/index-inline.html', filtered, (res, rej) => {
        if (rej) {
            process.exit();
        }
    });
})();