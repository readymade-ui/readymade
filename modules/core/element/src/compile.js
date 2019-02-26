const TEMPLATE_BIND_REGEX = /\{\{(\s*)(.*?)(\s*)\}\}/g;
const BIND_SUFFIX = ' __state';
function templateId() {
    let str = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    while (str.length < 3) {
        str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return str;
}
/* tslint:disable */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(24);
    });
}
/* tslint:enable */
class NodeTree {
    constructor(parentNode) {
        this.$flatMap = {};
        this.$parent = parentNode;
        this.$flatMap = {};
        this.$parentId = templateId();
        this.create();
    }
    setNode(node, key, value) {
        const id = this.$parentId + '-' + uuidv4().slice(0, 6);
        const clone = node.cloneNode(true);
        node.setAttribute(id, '');
        clone.setAttribute(id, '');
        if (!this.$flatMap[id]) {
            this.$flatMap[id] = {
                id,
                node: clone,
            };
            if (key && value) {
                this.updateNode(node, key, value);
            }
        }
    }
    updateNode(node, key, value) {
        const regex = new RegExp(`\{\{(\s*)(${key})(\s*)\}\}`, 'gi');
        const attrId = this.getElementByAttribute(node)[0].nodeName;
        const protoNode = this.$flatMap[attrId].node;
        let attr;
        for (const attribute of protoNode.attributes) {
            attr = attribute.nodeName;
            if (attr.includes('attr.') && !protoNode.getAttribute(attribute.nodeName.replace('attr.', ''))) {
                attr = attribute.nodeName.replace('attr.', '');
                protoNode.setAttribute(attr, attribute.nodeValue.replace(TEMPLATE_BIND_REGEX, ''));
                node.removeAttribute(attribute.nodeName);
            }
            if (attribute.nodeValue.match(regex, 'gi')) {
                node.setAttribute(attr, attribute.nodeValue.replace(regex, value));
            }
            if (attribute.nodeName.includes('attr.')) {
                node.removeAttribute(attribute.nodeName);
            }
        }
        if (protoNode.textContent.match(regex)) {
            node.textContent = protoNode.textContent.replace(regex, value);
        }
    }
    create() {
        const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } }, false);
        while (walk.nextNode()) {
            this.setNode(walk.currentNode);
        }
    }
    getElementByAttribute(node) {
        return Array.from(node.attributes).filter((attr) => {
            return /[A-Za-z0-9]{3}-[A-Za-z0-9]{6}/gm.test(attr.nodeName);
        });
    }
    update(key, value) {
        const walk = document.createTreeWalker(this.$parent, NodeFilter.SHOW_ELEMENT, { acceptNode(node) { return NodeFilter.FILTER_ACCEPT; } }, false);
        while (walk.nextNode()) {
            if (this.getElementByAttribute(walk.currentNode).length > 0) {
                this.updateNode(walk.currentNode, key, value);
            }
            else {
                this.setNode(walk.currentNode, key, value);
            }
        }
        return this.$parent;
    }
}
class BoundNode {
    constructor(parent) {
        this.$parent = parent;
        this.$tree = new NodeTree(this.$parent);
    }
    update(key, value) {
        this.$tree.update(key, value);
        if (this.$parent.onUpdate) {
            this.$parent.onUpdate();
        }
    }
}
class BoundHandler {
    constructor(obj) {
        this.$parent = obj;
    }
    set(target, key, value) {
        const change = {
            [key]: {
                previousValue: target[key],
                newValue: value,
            },
        };
        target[key] = value;
        this.$parent.$state['node' + BIND_SUFFIX].update(key, target[key]);
        if (target.onStateChange) {
            target.onStateChange(change);
        }
        return true;
    }
}
// support setting global state for now, what about descendant properties?
function setState(prop, model) {
    this.state[prop] = model;
}
function compileTemplate(elementMeta, target) {
    target.prototype.elementMeta = Object.assign(target.elementMeta ? target.elementMeta : {}, elementMeta);
    target.prototype.elementMeta.eventMap = {};
    target.prototype.template = `<style>${elementMeta.style}</style>${elementMeta.template}`;
    target.prototype.bindTemplate = bindTemplate;
    target.prototype.setState = setState;
}
function bindTemplate() {
    this.$state = {};
    this.$state['handler' + BIND_SUFFIX] = new BoundHandler(this);
    this.$state['node' + BIND_SUFFIX] = new BoundNode(this.shadowRoot ? this.shadowRoot : this);
    this.state = new Proxy(this, this.$state['handler' + BIND_SUFFIX]);
}
export { bindTemplate, compileTemplate, };
