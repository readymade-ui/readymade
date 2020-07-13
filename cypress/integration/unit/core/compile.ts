/// <reference types="cypress" />
import { isObject, findValueByString, setValueByString, uuidv4, templateId } from '../../../../src/modules/core/element/src/compile';
import { ElementMeta } from './../../../../src/modules/core/decorator/decorator';

interface ReadymadeElement extends HTMLElement {
    bindTemplate?: () => void;
    template?: string;
    elementMeta?: ElementMeta;
}

let element: ReadymadeElement;

describe('Compile Test', () => {

  beforeEach(() => {
    element = document.createElement('div');
    element.bindTemplate = () => {};
    element.template = `
    <div>Readymade Test</div>
    `
  });

  it('identifies object', () => {
     const obj = {
       foo: 'bar'
     };
     expect(isObject(obj)).equal(true);
  });

  it('identifies function', () => {
    const obj = () => {};
    expect(isObject(obj)).equal(true);
  });

  it('rejects string', () => {
    const obj = 'fizz';
    expect(isObject(obj)).equal(false);
  });

  it('rejects number', () => {
    const obj = 4;
    expect(isObject(obj)).equal(false);
  });

  it('finds a value in object', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'bravo'
        }
      }
    }
    expect(findValueByString(obj, 'foo.bar.baz')).equal('bravo');
  });

  it('creates a uuid', () => {
    const obj = {
      foo: {
        bar: {
          baz: 'bravo'
        }
      }
    }
    setValueByString(obj, 'foo.bar.baz', 'zulu');
    expect(findValueByString(obj, 'foo.bar.baz')).equal('zulu');
  });

  it('creates uuid', () => {
    const id = uuidv4();
    const regex = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    expect(regex.test(id)).equal(true);
  });

  it('creates template id', () => {
    const id = templateId();
    const regex = /([a-z]{3})/;
    console.log(id);
    expect(regex.test(id)).equal(true);
  });

});