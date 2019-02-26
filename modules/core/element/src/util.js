function getParent(el) {
    return el.parentNode;
}
function getChildNodes(template) {
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
function getSiblings(el) {
    return Array.from(getParent(el).children).filter((elem) => {
        return elem.tagName !== 'TEXT' && elem.tagName !== 'STYLE';
    });
}
function querySelector(selector) {
    return document.querySelector(selector);
}
function querySelectorAll(selector) {
    return Array.from(document.querySelectorAll(selector));
}
function getElementIndex(el) {
    return getSiblings(el).indexOf(el);
}
export { getParent, getChildNodes, getSiblings, querySelector, querySelectorAll, getElementIndex, };
