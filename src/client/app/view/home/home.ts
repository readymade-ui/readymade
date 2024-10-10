import { CustomElement, Component } from '@readymade/core';
import template from './home.html?raw';
import style from './home.css?raw';

import { render as renderSideNav } from '../../component/side-nav';
import { render as renderMainNav } from '../../component/main-nav';
import { render as renderLogo } from '../../component/logo';


@Component({
  selector: 'app-home',
  style,
  template
})
class HomeComponent extends CustomElement {
  constructor() {
    super();
  }
}

const declarativeTemplate = `
${renderSideNav()}
${renderMainNav()}

<header>
    ${renderLogo({size: 'is--large'})}
    <h2>TypeScript Decorators for Web Components</h2>
</header>

<section>
    <r-stats>
        <ul>
            <li> 🎰 Declare metadata for CSS and HTML ShadowDOM template</li>
            <li> ☕️ Single interface for 'autonomous custom' and 'customized built-in' elements </li>
            <li> 🏋️‍ Weighing in at 1.2Kb for 'Hello World' <span class="hint">(gzipped)</span> </li>
            <li> 1️⃣ One-way data binding </li>
            <li> 🎤 Event Emitter pattern </li>
            <li> 🖥 Server side renderable </li>
            <li> 🌲 Treeshakable </li>
        </ul>
    </r-stats>
</section>

<section id="intro">
    <h1>@readymade</h1>
    <p>Readymade is a JavaScript library for composing user interfaces with Web Components. <span class="i__c">@readymade/core</span> provides an interface for bootstrapping new custom elements.</p>
    <h2 id="whatis">What is Readymade?</h2>
    <p>Readymade simplifies handling template and styling for Web Components with TypeScript Decorators. The <span class="i__c">@Component</span> decorator has an interface that uses the Custom Elements v1 spec to provide template and styling for the component.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>Click&lt;/span>
  &#96;,
  style:&#96;
    :host {
        background: rgba(24, 24, 24, 1);
        cursor: pointer;
        color: white;
        font-weight: 400;
    }
  &#96;,
})
            </span>
    </r-code>
</section>

<section>
  <p>Readymade optimizes down to 1.2Kb for Hello World without data binding and 3Kb with data binding (gzipped). JavaScript UI libraries like React are bloated in comparison.</p>
  <p>Readymade is treeshakable and relies mainly on existing DOM API. A simple component that uses all the available decorators in Readymade: <span class="i__c">@Component</span>, <span class="i__c">@State</span>, <span class="i__c">@Listen</span> and <span class="i__c">@Emitter</span> is 3.7Kb (gzipped). </p>
  <h3>🏋️‍ Weighing in at 1.2Kb for 'Hello World' (gzipped)</h3>
  <r-meter value="1.2" max="44.17" label="Readymade w/o data-binding" color="#8AC926"></r-meter>
  <r-meter value="3.0" max="44.17" label="Readymade w/ data binding" color="#e6d06c"></r-meter>
  <r-meter value="3.7" max="44.17" label="Readymade w/ data binding &amp; event handling" color="#FFAE03"></r-meter>
  <r-meter value="44.17" max="44.17" label="React with hooks" color="#61dafb"></r-meter>
</section>

<section>
    <h2>A Readymade Example</h2>

    <p>A class named <span class="i__c">MyButtonComponent
        </span> is decorated with <span class="i__c">@Component</span> that includes properties for specifying the template and styling for a button. A call to action is bound to the template through the <span class="i__c">@State</span> decorator and a one-way data binding algorithm. <span class="i__c">@Listen</span> decorator binds <span class="i__c">addEventListener</span> to the element, while <span class="i__c">@Emitter</span> broadcasts 'bang' on click using the <span class="i__c">BroadcastChannel API</span>.</p>

    <r-code type="typescript">
        <span hidden>
import {
  Component,
  Emitter,
  Listen } from '@readymade/core';

import {
  ButtonComponent
} from '@readymade/dom';

@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends ButtonComponent {
  constructor() {
      super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
  @Emitter('bang')
  @Listen('click')
  public onClick(event) {
      this.emitter.broadcast('bang');
  }
  @Listen('keyup')
  public onKeyUp(event) {
      if (event.key === 'Enter') {
          this.emitter.broadcast('bang');
      }
  }
}
        </span>
    </r-code>
<p>The above example uses customized built-in elements, extending from <span class="i__c">HTMLButtonElement</span> under the hood. Readymade calls <span class="i__c">define</span> on the <span class="i__c">CustomElementRegistry</span> and provides encapsulation for the template and styling whether or not the element supports ShadowDOM.</p>
</section>


<section id="started">
    <h1>Getting Started</h1>
    <h2 id="install">Install</h2>
    <p>Install readymade/core via npm or yarn.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/core --save
            </span>
    </r-code>

    <p>If you want to use the client-side router or customized built-in elements also install these packages.</p>
    <r-code type="javascript">
            <span hidden>
npm i @readymade/router @readymade/dom --save
            </span>
    </r-code>

    <p>If typescript is not already part of your project, install it too.</p>

    <r-code type="javascript">
            <span hidden>
npm i typescript --save
            </span>
    </r-code>

    <p>Readymade requires <span class="i__c">experimentalDecorators</span> to be set to true in your <span class="i__c">tsconfig.json</span>. A sample minimal recommended configuration is below.</p>
    <r-code type="javascript">
            <span hidden>
{
  "compilerOptions": {
      "experimentalDecorators": true,
      "moduleResolution": "node",
      "typeRoots": ["node_modules/@types"],
      "lib": ["es2017", "dom", "dom.iterable"],
  }
}
            </span>
    </r-code>
    <h2 id="decorators">Readymade Starter</h2>
    <p>primr is a tool for generating Readymade projects.</p>
    <r-code type="javascript">
            <span hidden>
npx primr my-app
            </span>
    </r-code>

    <p>The above command generates a project called my-app. primr separates template and styling into separate files out of the box. Support for SCSS and PostCSS is baked in. The development environment is built with Parcel.</p>
    <r-code type="javascript">
      <span hidden>
import style from './button.scss';
import template from './button.html';

@Component({
  selector: 'my-button',
  style: style,
  template: template,
})
      </span>
</r-code>
    <p>primr bootstraps the necessary polyfill for Web Components to work in IE11, provides a client-side router and has the option to server-side render with @skatejs/ssr.</p>
</section>

<section id="docs">
    <h1>Using Readymade</h1>
    <h2 id="decorators">Decorators</h2>
    <p>Readymade implements UI components using a decorator pattern. Decorators are currently in [stage 2 proposal](https://github.com/tc39/proposal-decorators) for the ECMAScript Internationalization API Specification. Readymade implements decorators now with TypeScript.</p>
    <p>A class decorator called <span class="i__c">@Component</span> provides an interface for declaring styles and template for custom elements. The <span class="i__c">@Emitter</span> method decorator declares how CustomEvents that can be emitted or broadcasted. The <span class="i__c">@Listen</span> method decorator is a wrapper around <span class="i__c">addEventListener</span>, making the method it decorates the callback function for event handling. <span class="i__c">@State</span> method decorator returns a State that is bound to a template.</p>
    <h3>Readymade Decorators</h3>
    <ul class="definition__list">
        <li><span class="definition__title">@Component</span> metadata class decorator for defining template and styling</li>
        <li><span class="definition__title">@Listen</span> method decorator binds the method to <span class="i__c">addEventListener</span> callback</li>
        <li><span class="definition__title">@Emitter</span> method decorator declares <span class="i__c">CustomEvent</span> emitted by the component</li>
        <li><span class="definition__title">@State</span> method decorator returns stateful object used for data-binding the template</li>
    </ul>
    <p></p>
    <h3>@Component</h3>
    <p>The Component decorator is the place to specify the custom element selector. The decorator encapsulates the template and styles declared here with ShadowDOM on elements that support it or through attribute scoping on elements that don't.</p>
    <r-code type="javascript">
            <span hidden>
@Component({
  selector: 'my-button',
  custom: { extends: 'button' },
  template:&#96;
  &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})
class MyButtonComponent extends CustomElement
            </span>
    </r-code>
    <h4>@Component API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">autoDefine:</span> set to false to call CustomElementRegistry.define manually</li>
      <li><span class="definition__title">custom:</span> use with customized built-in elements to specify which element to extend from</li>
      <li><span class="definition__title">mode:</span> specifies whether ShadowDOM is "open" or "closed" mode</li>
      <li><span class="definition__title">selector:</span> tag name for the custom element</li>
      <li><span class="definition__title">style:</span> styles for the custom element</li>
      <li><span class="definition__title">template:</span> custom element HTML template</li>
    </ul>
    <h3>@Listen</h3>
    <p>Attaches the method it decorates to the function callback of <span class="i__c">addEventListener</span> . The following example listens for <span class="i__c">keyup</span> events, emits a <span class="i__c">CustomEvent</span> when the user presses the Enter key. This method decorator takes an event name in the first argument. When listening for broadcasted events over the <span class="i__c">BroadcastChannel API</span>, a channel name can be specified in the second argument.</p>
    <r-code type="javascript">
            <span hidden>
@Listen('keyup')
public onKeyUp(event) {
  if (event.key === 'Enter') {
      this.emitter.broadcast('bang');
  }
}
            </span>
    </r-code>
    <h4>@Listen API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the event</li>
      <li><span class="definition__title">channel:</span> the channel name to listen for events using the BroadcastChannel API</li>
    </ul>
    <h3>@Emitter</h3>
    <p>The Emitter method decorator adds the <span class="i__c">emitter</span> property to the component. <span class="i__c">@Emitter</span> first argument is the <span class="i__c">CustomEvent</span> type, options for the <span class="i__c">CustomEvent</span> in the second argument. To broadcast <span class="i__c">CustomEvent</span> with this <span class="i__c">Emitter</span>, specify a channel name in the third argument.</p>
    <r-code type="javascript">
            <span hidden>
@Emitter('bang', options, 'mtv')
            </span>
    </r-code>
    <h4>@Emitter API</h4>
    <ul class="definition__list">
      <li><span class="definition__title">event:</span> the name of the <span class="i__c">CustomEvent</span></li>
      <li><span class="definition__title">options:</span> options used with <span class="i__c">new CustomEvent</span></li>
      <li><span class="definition__title">channel:</span> the channel name to broadcast on using the <span class="i__c">BroadcastChannel API</span></li>
    </ul>
    <p>Emitters are stored on the component instance using the property <span class="i__c">emitter</span>. There are two methods for <span class="i__c">emitter</span>: <span class="i__c">emit</span> and <span class="i__c">broadcast</span>.</p>
    <ul class="definition__list">
            <li><span class="definition__title">emit</span> calls <span class="i__c">dispatchEvent</span> internally.</li>
            <li><span class="definition__title">broadcast</span> uses <span class="i__c">BroadcastChannel API</span> to broadcast events, even to other browser contexts.</li>
    </ul>
    <h3>@State</h3>
    <p>Binds a method that returns a stateful object to data bound template. In the example below, <span class="i__c">@State</span> decoarates the <span class="i__c">setState</span> method that returns an <span class="i__c">Object</span> with a property named <span class="i__c">buttonCopy</span>.</p>
    <r-code type="javascript">
      <span hidden>
@Component({
  template:&#96;
    &lt;span>{{buttonCopy}}&lt;/span>
  &#96;,
})
class MyButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }
  @State()
  getState() {
    return {
      buttonCopy: 'Click'
    }
  }
}
      </span>
    </r-code>
    <p>In the template, this property is wrapped in data-binding template syntax (curly brackets). When the instance of the component is instantiated, Readymade crawls the DOM nodes in the component's template and replaces  <span class="i__c">{{buttonCopy}}</span> with the value of that property on state: <span class="i__c">'Click'</span>.</p>
    <h4>A More Complex Example</h4>
    <p>Readymade can handle the following permutations on state, setting properties on Objects or indices of Arrays.</p>
    <r-code type="javascript">
      <span hidden>
export class TreeState {
  public arrayModel = [
    ['far', 'fiz', 'faz', 'fuz']
  ];
  public objectModel = {
    foo: {
      bar: 'x'
    }
  };
  public stringModel = 'r';
  public numberModel = 0;
}
@Component({
  selector: 'r-tree',
  template: html&#96;
  &lt;x-node data-model="{{arrayModel[0][1]}}">&lt;/x-node>
  &lt;x-node>{{objectModel['foo'].bar}}&lt;/x-node>
  &lt;x-node model="{{stringModel}}">&lt;/x-node>
  &lt;x-node>{{numberModel}}&lt;/x-node>
  &#96;
})
class TreeComponent extends CustomElement {
  constructor() {
    super();
  }
  @State()
  public getState() {
    return new TreeState();
  }
}
      </span>
    </r-code>

    <p>Readymade binds the properties in curly brackets to DOM attributes and content. The template is instantly updated as state changes through one-way data-binding.</p>
    <r-code type="javascript">
      <span hidden>
  &lt;x-node data-model="fiz">&lt;/x-node>
  &lt;x-node>x&lt;/x-node>
  &lt;x-node model="r">&lt;/x-node>
  &lt;x-node>0&lt;/x-node>
      </span>
    </r-code>
</section>

<section>
    <h2 id="components">Components</h2>
    <p>Readymade is packaged with several component classes to bootstrap UI component development. Readymade takes the hassle out of remembering which DOM elements support ShadowDOM, encapsulating elements with ShadowDOM that support it under the hood. Readymade reduces the complexity of implementing customized built-in elements by handling styles and template with a unified API via the <span class="i__c">@Component</span> decorator.</p>
    <p>Typically you would extend <span class="i__c">HTMLElement</span> for an element that utilizes ShadowDOM.</p>
    <r-code type="javascript">
            <span hidden>
class MyComponent extends HTMLElement
            </span>
    </r-code>
    <h4>Automomous custom elements</h4>
    <p>With Readymade extend <span class="i__c">CustomElement</span> instead when implementing autonomous custom elements. CustomElement extends <span class="i__c">HTMLElement</span> already. Along with the <span class="i__c">@Component</span> decorator, <span class="i__c">CustomElement</span> attachs ShadowDOM and provides an interface for interacting with Readymade API via TypeScript. <span class="i__c">CustomElement</span> is exported from the @readymade/core package.</p>
    <r-code type="javascript">
            <span hidden>
import { CustomElement } from 'readymade/core';

class MyComponent extends CustomElement
            </span>
    </r-code>
    <p>Two other autonomous custom element classes <span class="i__c">PseudoElement</span> and <span class="i__c">StructuralElement</span> are also exported from @readymade/core.</p>
    <ul class="definition__list">
      <li><span class="definition__title">CustomElement</span> attachs ShadowDOM</li>
      <li><span class="definition__title">PseudoElement</span> encapsulates template and styling without ShadowDOM</li>
      <li><span class="definition__title">StructuralElement</span> doesn't accept template or styling, is purely "structural"</li>
    </ul>
    <p>All other component classes are exported from @readymade/dom, including customized built-in elements.</p>
    <h4>Customized built-in elements</h4>
    <p>Sometimes you need to extend other elements to retain Web Accessibility features or other user experience paradigms. Customized built-in elements allow you to extend form input elements, retaining their accessible characteristics.</p>
    <r-code type="javascript">
            <span hidden>
class MyInputComponent extends HTMLInputElement
            </span>
    </r-code>
    <p>Readymade handles customized built-in elements slightly differently. These elements are exported from the @readymade/dom package. Readymade provides encapsulation for styling despite the lack of ShadowDOM in customized built-in element by scoping the styles with attributes in the <span class="i__c">&lt;head></span>.</p>
    <r-code type="javascript">
            <span hidden>
import { InputComponent } from 'readymade/dom';

@Component({
  selector: 'my-input',
  custom: { extends: 'input' },
  style:&#96;
      :host {
          background: rgba(24, 24, 24, 1);
          cursor: pointer;
          color: white;
          font-weight: 400;
      }
  &#96;,
})

class MyInputComponent extends InputComponent
            </span>
    </r-code>
    <p>Readymade provides a single interface for handling 'autonomous custom' and 'customized built-in' elements. Customized built-in elements require the <span class="i__c">custom</span> property set to an <span class="i__c">Object</span> that would normally be used with <span class="i__c">CustomElementRegistry.register</span>. By using the <span class="i__c">is</span> attribute in DOM, the <span class="i__c">input</span> will become an instance of <span class="i__c">MyInputComponent</span>, a customized built-in element.</p>
    <r-code type="javascript">
      <span hidden>
&lt;input is="my-input">
      </span>
  </r-code>
<h4>Repeaters</h4>
<p>Readymade exports two classes useful for looping over a data model and appending DOM nodes with the content of that model: <span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span>.</p>

<ul class="definition__list">
  <li><span class="definition__title">Repeater</span> is a custom element that references a template to iterate over a model and replace DOM nodes.</li>
  <li><span class="definition__title">TemplateRepeater</span> extends HTMLTemplateElement to iterate over a model and replace DOM nodes.</li>
</ul> 

<p>Suppose an Array of strings is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: ["1", "2", "3", "4", "5"]
  }
}
  </span>
</r-code>

<p><span class="definition__title">TemplateRepeater</span> clones the template, iterates over the Array, binds the data model to each node, then inserts the new cloned template in the <span class="i__c">parentNode</span> of the original template.</p>


<r-code type="javascript">
  <span hidden>
&lt;ul class="is--large">
  &lt;template is="r-repeat" items="item of items">
    &lt;li repeat="item" foo="{{item}}">{{item}}&lt;/li>
&lt;/template>
&lt;/ul>
  </span>
</r-code>

<h4>TemplateRepeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p>Suppose an Array of objects is found on state.</p>

<r-code type="javascript">
  <span hidden>
@State()
public getState() {
  return {
    items: [
      {index: "1", title: "One"},
      {index: "2", title: "Two"},
      {index: "3", title: "Three"},
      {index: "4", title: "Four"},
      {index: "5", title: "Five"}
    ]
  }
}
  </span>
</r-code>

<p><span class="definition__title">Repeater</span> clones a template anywhere in the document, iterates over the Array, binds the data model to each node that is appended to DOM, and then inserts the cloned template as the content of <span class="i__c">Repeater</span>.</p>

<r-code type="javascript">
  <span hidden>

&lt;ul class="is--large">
  &lt;template id="object-repeater" items="item of items">
    &lt;li repeat="item" foo="{{item.index}}">{{item.title}}&lt;/li>
  &lt;/template>
&lt;/ul>

&lt;r-repeatr template="object-repeater" items="item of items">
&lt;/r-repeatr>
  </span>
</r-code>

<h4>Repeater API</h4>
<ul class="definition__list">
  <li><span class="definition__title">template:</span> id of the template Repeater should reference</li>
  <li><span class="definition__title">items:</span> string that specifies the property on state <span class="definition__title">TemplateRepeater</span> should reference</li>
</ul>

<p><span class="i__c">Repeater</span> and <span class="i__c">TemplateRepeater</span> use a template element. Any repeatable element should be tagged with the <span class="i__c">repeat</span> attribute that matches the name of the item reference passed into the <span class="i__c">items</span> attribute. </p>

</section>
<section>
  <h2 id="components">Router</h2>
  <p>@readymade/router exports a client-side router that handles swapping out views on a root element in DOM.</p>
  <r-code type="javascript">
    <span hidden>
import { Router } from '@readymade/router';

const routing = [
  { path: '/', component: 'app-home' },
  { path: '/test', component: 'app-testbed' },
  { path: '/perf', component: 'app-perftest' }
];

const router = new Router('#root', routing);
  </span>
</r-code>
  <h4>Router API</h4>
  <ul class="definition__list">
    <li><span class="definition__title">id</span> selector for DOM Element Router should append views</li>
    <li><span class="definition__title">routing</span> Array of configuration for routes </li>
  </ul>
  <p><span class="i__c">Route</span> configuration is used to specify the renderable component, query params, page title and meta description, and JSON-LD. While success may be varied client-side for specifying these properties for SEO, the same Route configuration could be used for server-side rendering to sure crawlers can analyze the JSON-LD.</p>
  <h4>Route</h4>
  <ul class="definition__list">
    <li><span class="definition__title">path</span> the URL path</li>
    <li><span class="definition__title">component</span> component selector as string </li>
    <li><span class="definition__title">queryParams</span> Object that specifies query params in key / value pairs </li>
    <li><span class="definition__title">title</span> document title </li>
    <li><span class="definition__title">description</span> text displayed in the content attribute of meta description tag </li>
    <li><span class="definition__title">schema</span>JSON-LD</li>
  </ul>
  
  <p>* description and JSON-LD schema require the appropriate meta and script tags, respectively to already be available in DOM.</p>
  
  <h2>Server Side Rendering</h2>
  
  <p>Readymade is server side renderable with @skatejs/ssr and Express.</p>
     
  <p>There is one limitation: the implementation can only extend from CustomElement (ShadowDOM). Customized built-in elements are not server side renderable by @skatejs/ssr.</p>
  
  <p>For more information, read <a href="https://dev.to/steveblue/server-side-rendering-web-components-320g" target="_blank" rel="noreferrer" >Server Side Render Web Components</a> and follow the link to the source code for an example of Express middleware. <a href="https://gist.github.com/steveblue/d003740efd08983f78d9d3e49e61072d" target="_blank" rel="noreferrer" >Advanced example of server side rendering web components with SEO</a> is available in a gist.</p>
  
  
  
</section>

<section id="why">
        <h1>Why Do We Need Another Web Component Library?</h1>
        <p>Readymade started as an exercise to see how component based frameworks like Angular, Polymer, and Stencil could be built with just available browser API. The microlibrary that came to fruition simplifes web component development and includes some powerful features. The Component metadata decorator provides an easy interface for declaring styling and template. One way data binding allows you to forget about setting innerHTML and attributes of elements. Method decorators bind CustomEvent listeners and use the BroadcastChannel API to overcome limitations of event bubbling. Readymade is treeshakable, meaning you only import the code your project needs and leave the rest behind.</p>
        <p>A simple 'Hello World' readymade project compiled with TypeScript and Terser minifies down to ~1Kb (gzipped). This site is built with Readymade and weighs in ~7Kb (gzipped). The bundle deployed to Github Pages includes minimal application logic, a small library of components, polyfills, and third party library for syntax highlighting (PrismJS)and it weighs in at ~38Kb (gzipped).</p>
        <p>The name of the project 'readymade' is an homage to Marcel Duchamp, an artist in the 20th century who made art with ordinary objects. Like Duchamp's readymades, this library picks up ordinary objects found in ECMAScript, repositions and joins them together to form something completely new.</p>
 </section>

 <section id="resources">
    <h1>Resources</h1>
    <ul>
        <li><a target="_blank" rel="noreferrer" href="https://www.npmjs.com/package/@readymade/core">npm</a></li>
        <li><a target="_blank" rel="noreferrer" href="https://github.com/readymade-ui/readymade">Github</a></li>
    </ul>
 </section>

<footer>
    ${renderLogo({size: 'is--large', classes: 'no--subtitle'})}
</footer>
`


const render = () => `
  <app-home>
    <template shadowrootmode="open">
      <style>
        ${style}
      </style>
      ${declarativeTemplate}
    </template>
  </app-home>
`;

export { HomeComponent, render };
