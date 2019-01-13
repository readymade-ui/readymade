# readymade

Microlibrary for coding Web Components with TypeScript Decorators.

### Problem

When developing Web Components with Custom Elements API there is a lot of boilerplate that is repeated in all class declarations.


### Solution

Provide a Functional approach to encapsulate some of this logic into reusable Function, specifically a special kind of higher order Function called a Decorator. Decorators are available in TypeScript. Decorators are used my libraries like Angular and Stencil. This approach can be applied to Custom Elements v1, giving the engineer a consistent interface for generating UI components.



### Example

The below example is a button that extends HTMLButtonElement. Since this is a customized built-in elements, MyButtonComponent extends from the native HTMLButtonElement, we cannot attach Shadow DOM. attachDOM compiles the template as the my-button innerHTML and places a style tag in the `<head>` to style the Element.

```js
import { Component, html, css, attachDOM, attachStyle, Listen } from 'src/decorators/component';

class ButtonComponent extends HTMLButtonElement {
	constructor() {
		super();
		attachDOM(this);
		attachStyle(this);
		this.onInit();
	}
}

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
class MyButtonComponent extends ButtonComponent {
	constructor() {
		super();
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
