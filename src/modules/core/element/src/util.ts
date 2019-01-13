function getParent(el) {
  return el.parentNode;
}

function getChildNodes() {
    function getChildren(node: Element, path: Element[] = [], result: Element[] = []){
        if(!node.children.length)
            result.push(path.concat(node));
        for(const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
   const nodes : Element[] = getChildren(this, []).reduce((nodes, curr) => {
     return nodes.concat(curr);
   },[]);
   return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
}

function getSiblings(el, filter) {
  if (!filter) {
    filter = [];
  }
  return Array.from(getParent(el).children).filter((elem) => {
    return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
  });
}

function querySelector(selector: string) {
  return document.querySelector(selector);
}

function querySelectorAll(selector: string) {
  return Array.from(document.querySelectorAll(selector));
}

function getElementIndex(el) {
  return getSiblings(el).indexOf(el);
}

export {
  getParent,
  getChildNodes,
  getSiblings,
  querySelector,
  querySelectorAll,
  getElementIndex,
};
