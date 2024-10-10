/* eslint-disable */
export function getParent(el) {
  return el.parentNode;
}
export function getChildNodes(template) {
  const elem = template ? template : this;
  if (!elem) {
    return [];
  }
  function getChildren(node, path = [], result = []) {
    if (!node.children.length) {
      result.push(path.concat(node));
    }
    for (const child of node.children) {
      getChildren(child, path.concat(child), result);
    }
    return result;
  }
  const nodes = getChildren(elem, []).reduce((nd, curr) => {
    return nd.concat(curr);
  }, []);
  return nodes.filter((item, index) => nodes.indexOf(item) >= index);
}
export function getSiblings(el) {
  return Array.from(getParent(el).children).filter((elem) => {
    return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
  });
}
export function querySelector(selector) {
  return document?.querySelector(selector);
}
export function querySelectorAll(selector) {
  return Array.from(document.querySelectorAll(selector));
}
export function getElementIndex(el) {
  return getSiblings(el).indexOf(el);
}
export const isNode =
  typeof process === 'object' && String(process) === '[object process]';
export const isBrowser =
  typeof window !== undefined && typeof window?.document !== undefined;
