# readymade

Find out more in our documentation portal built with Readymade on [Github Pages](https://readymade-ui.github.io/readymade/).

JavaScript microlibrary for developing Web Components with Decorators that uses only native spec to provide robust features.

- 🎰 Declare metadata for CSS and HTML ShadowDOM template
- ☕️ Single interface for 'autonomous custom elements' and 'customized built-in elements'
- 🎤 Event Emitter pattern
- 1️⃣ One-way data binding
- 🌲 Treeshakable
- 🏋️‍ Weighing in ~2Kb for 'Hello World' (gzipped)


### Metadata Class Decorator 🎰

The below example is a button that extends HTMLButtonElement. Since this is a customized built-in elements, MyButtonComponent extends from the native HTMLButtonElement, we cannot attach Shadow DOM. attachDOM compiles the template as the my-button innerHTML and places a style tag in the `<head>` to style the Element.

```js
import { Component, html, css, attachDOM, attachStyle, Listen } from '@readymade/core';

@Component({
	selector: 'my-button',
	template: html`
		<b>Click me!</b>
	`,
	style: css`
		:host {
			background: red;
			cursor: pointer;
			padding: 10px;
			border-radius: 30px;
			border: 0 none;
			color: white;
			text-decoration: none;
		}
	`,
})
class MyButtonComponent extends HTMLButtonElement {
	constructor() {
		super();
		attachDOM(this);
		attachStyle(this);
		this.onInit();
	}
	@Listen('click')
	onClick(event) {
		console.log(this, event);
	}
}

customElements.define('my-button', MyButtonComponent, { extends: 'button' });
```

In a template somewhere...

```html
<button is="my-button"></button>
```

Wa la! A Custom Element that retains all the behaviors of a button, yet extends button to do other things. In this nieve implementation all that is changed is the style of the button. Creating a customized built in element like this will retain all the behaviors of the element that is extended.


### Single Interface ☕️

I can become confusing trying to handle the differences between 'autonomous custom elements' and 'customized built-in elements'. Autonomous custom elements deploy ShadowDOM, while customized built-in elements extend existing elements and typically cannot attach ShadowDOM.


We can go even further to reduce boilerplate in the above example by importing one of readymade-ui classes that already extend HTMLButtonElement.

```js
import { Component, html, css, ButtonComponent } from '@readymade/core';

class MyButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
}
```

Because of this level of abstraction, we longer have to figure out how to attach template and styling for either 'autonomous custom elements' and 'customized built-in elements'. Just call `super()` and pickup the `constructor` from ButtonComponent that handles the template and styling.

When developing an autonomous custom element just import `CustomElement` instead. The new element can now attach `ShadowDOM`.

```js
import { Component, html, css, CustomElement } from '@readymade/core';

class MyButtonComponent extends CustomElement {
	constructor() {
		super();
	}
}
```

### Events 🎤

Readymade comes packaged with an event emitter and event listener pattern in the form of Method Decorators.


```js
  @Emitter('bang', { bubbles: true, composed: true })
  @Listen('click')
  public onClick(event) {
			this.emitter.broadcast('bang');
  }
```

Declaring an `Emitter` stores a CustomEvent on the element that can later be emitted with `dispatchEvent` or broadcast with `BroadcastChannel API`.


## One-Way Data Binding 1️⃣

A decorator called `@State` stores local state on the Custom Element that can be bound to the template. Under the hood, a handler bound to ES2015 `Proxy` updates the template without the need for `eval`.

```js
@Component({
  selector: 'my-button',
  template: '{{model}}'
})
class MyButtonComponent extends ButtonComponent {
  constructor() {
    super();
  }
  @State() 
  public getState() {
	return {
		model: 'Click Me';
	}
  }
```

Update the template by calling `setState`, passing in the property you want to update along with the new value.

```js
this.setState('model', 'Foo Bar');
```

### Treeshakable 🌲

readymade is developed with named ES2015 exports that work elegantly with build tools like Rollup.

### Weighing in ~2Kb 🏋️‍

A simple `Hello World` bundle weighs around `2Kb` gzipped and `~1.7Kb` with brotli compression.


## Getting Started

### Installation

Installing `readymade` is as simple as downloading the npm package and saving it to your project.

```
npm i @readymade/core --save
```

### Make A Custom Element

#### 1. Create a new file for your component

```
touch src/app/components/my.component.ts
```

#### 2. Create a new component

Here is a simple boilerplate to get started. This boilerplate will attach ShadowDOM to the element, gives you a space for the html template and css styling.

```js
import { Component, css, html, CustomElement } from '@readymade/core';

@Component({
  selector: 'my-component',
  template: html`

	`,
  style: css`

	`,
})
class MyComponent extends CustomElement {
  constructor() {
    super();
  }
}

customElements.define('my-component', MyComponent);

export { MyComponent };
```

#### 3. Import MyComponent into your application

i.e.

```
import { MyComponent } from 'path/to/my.component'
```

or if you just wish to export from some sort of index.

```
export { MyComponent } from 'path/to/my.component'
```

#### 4. Use MyComponent in a template.

```html

<my-component></my-component>
```

Components made with `readymade` can be used anywhere Custom Elements can be used because they compile down to Custom Elements v1.

## How To Compile Readymade Custom Elements

Readymade is dependent only on one package for compilation: `typescript`.

A sample tsconfig could be as follows. Make sure `experimentalDecorators` is set to `true`.

```js
{
  "compilerOptions": {
    "baseUrl": "./",
    "experimentalDecorators": true,
    "module": "ES2015",
    "outDir": "./path/to/dist",
    "target": "ES2015",
    "sourceMap": true
  },
  "include": [
    "./path/to/**/*.ts"
  ]
}

```

This is the bare minumum needed to compile with `typescript`.

## Why does readymade exist?

readymade is an experiment to see how Web Components can be developed using only parts of ECMAScript or portions of the spec still being proposed, such as Decorators.

The name 'readymade' is in an homage to Marcel Duchamp, an artist in the 20th century who made art with ordinary objects. Like Duchamp's readymades, this library picks up ordinary objects found in ECMAScript, repositions and joins them together to form something completely new: a set of tools that make developing Web Components easier.

Below is a further explanation for my readymade exists.

### Problem

When coding Web Components with Custom Elements API there is a lot of boilerplate that is repeated in all class declarations. Suppose you are developing a UI library with dozens of Custom Elements. At the very least you need to attach ShadowDOM and provide a template and styling.

```js
const shadowRoot: ShadowRoot = this.attachShadow(options || {});
const t = document.createElement('template');
t.innerHTML = `
<style>
.content {
	color: red;
}
</style>
<div class="content"> Some Content </div>
`;
shadowRoot.appendChild(t.content.cloneNode(true));
```

This can result in inconsistant approaches as different engineers work on the library, making it harder for build tooling to statically analyze a component and process the CSS and HTML. What if you could have an interface like this that handles all the boilerplate for you?

```js
@Component({
	template: html`
		<div class="content"> Some Content </div>
	`,
	style: css`
		.content {
			color: red;
		}
	`,
})
```

### Solution

Provide a set of reusable functions that reduce duplicate code and provide some convenience methods. This project specifically uses a special kind of higher order Function called a Decorator. Decorators are currently a proposed feature in ECMAScript. We can start using them now with TypeScript. Decorators are used by libraries like Angular and Stencil. By utilizing Decorators, we gain a consistent interface for coding and generating UI components.


## Develop `readymade` packages.

This repository is essentially a monorepo for developing `@readymade` packages. Below are instructions for installing dependencies and running the development server.

In early beta status, readymade does not have any CI or testing strategy. Any contributions for these are welcome.

readymade does have a development server, development build scripts that build an example site. readymade relies on `rollup` to build distribution packages for the library.

### Installation

```
yarn install
yarn
```

### Development

The dev build implements a watcher to compile and bundle the app on file change.

```
yarn start
```

Run the development server in a separate tab. The development server currently relies on `live-server`.

```
yarn dev
```

Optionally, build for production and use a local express server to serve the example site bundled for production. This script bundles and minifies the application for production, serving gzipped compressed.

```
yarn build
```
In another terminal:

```
yarn serve
```

This combo of commands builds the example site for production and serves it minified and gzipped.