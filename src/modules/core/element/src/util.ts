function getParent(el) {
  return el.parentNode;
}

<<<<<<< HEAD
function getChildNodes(template?:any) {
  const _elem = template ? template : this;
  if (!_elem) return [];
    function getChildren(node: any, path: any[] = [], result: any[] = []){
        if(!node.children.length)
            result.push(path.concat(node));
        for(const child of node.children)
            getChildren(child, path.concat(child), result);
        return result;
    }
   const nodes : Element[] = getChildren(_elem, []).reduce((nodes, curr) => {
     return nodes.concat(curr);
   },[]);
   return nodes.filter((item, index) => { return nodes.indexOf(item) >= index; });
=======
function getChildNodes(template?: any) {
  const elem = template ? template : this;
  if (!elem) { return []; }
    function getChildren(node: any, path: any[] = [], result: any[] = []) {
        if (!node.children.length) {
            result.push(path.concat(node));
        }
        for (const child of node.children) {
            getChildren(child, path.concat(child), result);
        }
        return result;
    }
   const nodes: Element[] = getChildren(elem, []).reduce((nd, curr) => {
     return nd.concat(curr);
   }, []);
   return nodes.filter((item, index) => nodes.indexOf(item) >= index);
>>>>>>> dev
}

function getSiblings(el: Element) {
  return Array.from(getParent(el).children).filter((elem: Element) => {
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
