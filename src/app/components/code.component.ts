import { Component, css, html, CustomElement, StateChange } from './../../modules/core/index.js';

declare let Prism: any;

@Component({
  selector: 'r-code',
  template: html`
    <pre class="language-{{type}}">
      <code class="language-{{type}}">
      </code>
    </pre>
    <slot hidden></slot>
  `,
  style: css`

    :host {
      display: block;
      padding-top: 1em;
      padding-bottom: 1em;
    }

    code[class*="language-"],
    pre[class*="language-"] {
        -moz-tab-size: 2;
        -o-tab-size: 2;
        tab-size: 2;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
        white-space: pre;
        white-space: pre-wrap;
        word-wrap: normal;
        font-family: 'DankMono-Regular', 'Courier New', monospace;
        font-size: 14px;
        color: #e0e2e4;
        text-shadow: none;
    }
    pre[class*="language-"],
    :not(pre)>code[class*="language-"] {
        background: #0e1014;
    }
    pre[class*="language-"] {
        padding: 15px;
        border-radius: 4px;
        border: 1px solid #0e1014;
        overflow: auto;
    }

    pre[class*="language-"] {
        position: relative;
    }
    pre[class*="language-"] code {
        white-space: pre;
        display: block;
    }

    :not(pre)>code[class*="language-"] {
        padding: 0.2em 0.2em;
        border-radius: 0.3em;
        border: 0.13em solid #7a6652;
        box-shadow: 1px 1px 0.3em -0.1em #000 inset;
    }
    .token.namespace {
        opacity: .7;
    }
    .token.function {
        color: rgba(117, 191, 255, 1.0);
    }
    .token.class-name {
      color: #e0e2e4;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
        color: #208C9A;
    }
    .token.operator,
    .token.boolean,
    .token.number {
        color: #ff7de9;
    }
    .token.attr-name,
    .token.string {
        color: #e6d06c;
    }

    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
        color: #BB9CF1;
    }
    .token.selector,
    .token.inserted {
        color: #b6babf;
    }
    .token.atrule,
    .token.attr-value,
    .token.keyword,
    .token.important,
    .token.deleted {
        color: #ff7de9;
    }
    .token.regex,
    .token.statement {
        color: #FFE4A6;
    }
    .token.placeholder,
    .token.variable {
        color: #FF7DE9;
    }
    .token.important,
    .token.statement,
    .token.bold {
        font-weight: bold;
    }
    .token.punctuation {
        color: #a9bacb;
    }
    .token.entity {
        cursor: help;
    }
    .token.italic {
        font-style: italic;
    }

    code.language-markup {
        color: #b1b1b3;
    }
    code.language-markup .token.tag {
        color: #75bfff;
    }
    code.language-markup .token.attr-name {
        color: #FF97E9;
    }
    code.language-markup .token.attr-value {
        color: #d7d7db;
    }
    code.language-markup .token.style,
    code.language-markup .token.script {
        color: #75bfff99;
    }
    code.language-markup .token.script .token.keyword {
        color: #9F9F9F;
    }

    /* Line highlight plugin */
    pre[class*="language-"][data-line] {
        position: relative;
        padding: 1em 0 1em 3em;
    }
    pre[data-line] .line-highlight {
        position: absolute;
        left: 0;
        right: 0;
        padding: 0;
        margin-top: 1em;
        background: rgba(255, 255, 255, 0.08);
        pointer-events: none;
        line-height: inherit;
        white-space: pre;
    }
    pre[data-line] .line-highlight:before,
    pre[data-line] .line-highlight[data-end]:after {
        content: attr(data-start);
        position: absolute;
        top: .4em;
        left: .6em;
        min-width: 1em;
        padding: 0.2em 0.5em;
        background-color: rgba(255, 255, 255, 0.4);
        color: black;
        font: bold 65%/1 sans-serif;
        height: 1em;
        line-height: 1em;
        text-align: center;
        border-radius: 999px;
        text-shadow: none;
        box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
    }
    pre[data-line] .line-highlight[data-end]:after {
        content: attr(data-end);
        top: auto;
        bottom: .4em;
    }
	`
})
class RCodeComponent extends CustomElement {

  public state: {
    type: string;
  }
  constructor() {
    super();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', event => this.onSlotChange(event));
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
        this.setState('type', this.getAttribute('type'));
        break;
    }
  }

  onSlotChange(ev: any) {
    const code = ((<any>this.shadowRoot.querySelector('slot').assignedNodes())[1].textContent);
    this.shadowRoot.querySelector('code').innerHTML = Prism.highlight(code, Prism.languages[this.getAttribute('type')], this.getAttribute('type'));
  }
}

customElements.define('r-code', RCodeComponent);

export { RCodeComponent };
