/// <reference types="cypress" />
import {
  attachShadow,
  attachDOM,
  attachStyle,
} from '../../../../src/modules/core/element/src/attach';
import { ElementMeta } from './../../../../src/modules/core/decorator';

interface ReadymadeElement extends HTMLElement {
  bindTemplate?: () => void;
  template?: string;
  elementMeta?: ElementMeta;
}

let element: ReadymadeElement;

describe('attachShadow Test', () => {
  beforeEach(() => {
    element = document.createElement('div');
    element.bindTemplate = () => {};
    element.template = `
    <div>Readymade Test</div>
    `;
    element.elementMeta = {
      selector: 'x-test',
      mode: 'open',
    };
  });

  it('binds shadow root to element', () => {
    attachShadow(element, { mode: element.elementMeta.mode });
    expect(element.shadowRoot).does.not.equal(null);
  });

  it('has a shadow dom template', () => {
    attachShadow(element, { mode: element.elementMeta.mode });
    expect(element.shadowRoot.querySelector('div').innerText).equals(
      'Readymade Test',
    );
  });
});

describe('attachDOM Test', () => {
  beforeEach(() => {
    element = document.createElement('div');
    element.bindTemplate = () => {};
    element.elementMeta = {
      selector: 'x-test',
      template: `
      <div>Readymade Test</div>
      `,
    };
  });

  it('does not bind shadow root to element', () => {
    expect(element.shadowRoot).equals(null);
  });

  it('has a template', () => {
    attachDOM(element);
    expect(element.querySelector('div').innerText).equals('Readymade Test');
  });
});

describe('attachStyle Test', () => {
  beforeEach(() => {
    element = document.createElement('div');
    element.bindTemplate = () => {};
    element.elementMeta = {
      selector: 'x-test',
      template: `
      <div>Readymade Test</div>
      `,
      style: `
        :host {
          background: #ff0000;
        }
      `,
    };
  });

  xit('head contains style tag with injected styles', () => {
    attachShadow(element, { mode: 'open' });
    attachStyle(element);
    const style: HTMLElement = document
      .querySelector('head')
      .querySelector('[id="x-test-x"]');
    expect(style.innerText).contains('[is=x-test]');
  });
});
