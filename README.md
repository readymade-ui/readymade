# readymade

JavaScript microlibrary for developing Web Components with Decorators that uses only native spec to provide robust features.

- 🎰 Declare metadata for CSS and HTML ShadowDOM template
- ☕️ Single interface for 'autonomous custom elements' and 'customized built-in elements'
- 🎤 Event Emitter pattern
- 1️⃣ One-way data binding
- 🌲 Treeshakable
- 🏋️‍ Weighing in ~2Kb for 'Hello World' (gzipped)


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


### Example

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

We can go even further to reduce boilerplate by importing one of readymade-ui classes that already extend HTMLButtonElement.

```js
import { Component, html, css, ButtonComponent } from '@readymade/core';

class MyButtonComponent extends ButtonComponent {
	constructor() {
		super();
	}
}
```


## Getting Started

```
npm install
```

## Development

The dev build implements a watcher to compile and bundle the app on file change.

```
npm start
```

Run the express server in a separate tab.

```
node backend/server.js
```

or use a tool like live-server.

```
cd dist
live-server
```

## Production

The prod build minifies the test package and provides an entry point for using the Components defined in the library.

```
NODE_ENV=prod node index.js
```
