# CHANGELOG

### 3.1.3

- fix: `RdSlider` can now display values when used with `RdControl`
- fix: `RdSlider` vertical slider values were offset
- fix: `RdRadioGroup` radio group selection when set with control group
- fix: `RdDropdown` select menu should display default as first option
- fix: `RdDropdown` select menu should not display empty last option

### 3.1.2

- fix: `RdSlider` should initialize with the correct position when using a control
- fix: control types were not properly exported, prohibiting their use in third-party projects
- fix: various TypeScript issues, mostly internal

### 3.1.1

- fix: `RdDial` and `RdSlider` handles could appear with incorrect position
- fix: Readymade UI doc styles

### 3.1.0

Readymade 3.1.0 Large Glass breaks the glass, adding new features that allow UI controls to communicate over WebSocket, WebRTC Data Channel, and Touch OSC.

### @readymade/ui

- new: `RdDial` has similar interface to `RdSlider` but action is limited to a rotary dial
- new: documentation available at [https://readymade-ui.github.io/readymade/#/lib](https://readymade-ui.github.io/readymade/#/lib)
- feat: `RdControl` can now be set via attribute or via `setControl` method on all inputs in @readymade/ui
- feat: provide CSS styles for `RdButton` via `setControl`. Any provided styles are bound to the internal `HTMLButtonElement`

### @readymade/transmit

- feat: `Transmitter` is a new `class` for handling `WebRTC DataChannel`, `WebSocket` and `Touch OSC` communication.

`Transmitter` is a Swiss-army knife for communicating over WebRTC DataChannel, WebSocket or Touch OSC.

#### Getting Started

```bash
npm install @readymade/transmit
```

```bash
yarn add @readymade/transmit
```

Import `Transmitter` and instantiate with a configuration Object.

```javascript
import { Transmitter, TransmitterConfig } from '@readymade/transmit';

const config: TransmitterConfig = {
  sharedKey: 'lobby',
  rtc: {
    iceServers,
  },
  serverConfig: {
    http: {
      protocol: 'http',
      hostname: 'localhost',
      port: 4449,
    },
    ws: {
      osc: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4445,
      },
      signal: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4446,
      },
      announce: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4447,
      },
      message: {
        protocol: 'ws',
        hostname: 'localhost',
        port: 4448,
      },
    },
  },
  onMessage,
  onConnect,
}

const transmitter = new Transmitter(config);
```

### Messages

When `signal` and `announce` servers are configured, the instance of `Transmitter` will automatically attempt a handshake with a remote peer. If a peer is found, a WebRTC DataChannel peer to peer connection will open. To send a message over the data channel use the `send` method.

```javascript
transmitter.send({ message: 'ping' });
```

If you want to send messages over WebSocket, use `sendSocketMessage`.

```javascript
transmitter.sendSocketMessage({ message: 'ping' });
```

To send a message over TouchOSC, use `sendTouchOSCMessage`, ensuring the data your are sending follows the OSC protocol. Below is an example of sending a OSC message with type definitions.

```javascript
transmitter.sendTouchOSCMessage('/OSCQUERY/Left Controls/Flip H', [
  {
    type: 'i',
    value: 1,
  },
]);
```

To listen for messages, inject a callback into the configuration. In the above example, `onMessage` would appear like so:

```javascript
const onMessage = (message) => {
  if (message.payload.event === 'ping') {
    this.transmitter.send({ event: 'pong' });
  }
};
```

To react to a peer to peer connection, bind an `onConnect` callback to the configuration.

### BREAKING CHANGES

`RdControl` type definition in @readymade/ui has been updated to normalize types for all controls and make type definitions more specific per control. `RdLegacyControl` is now exported which is the old type definition. The interface of all controls have been normalized, some properties are deprecated, while other shared properties are now moved to `attributes` that are unique to each control.

#### Before

```typescript
interface RdControl {
  type: string;
  name: string;
  orient?: string;
  min?: number | number[];
  max?: number | number[];
  isActive?: boolean;
  placeSelf?: string;
  transform?: string;
  numberType?: 'int' | 'float';
}
```

#### After

```typescript
interface RdControl<A> {
  type?: string;
  name: string;
  isActive?: boolean;
  hasUserInput?: boolean;
  hasRemoteInput?: boolean;
  currentValue?: number | string | Array<number> | Array<string> | boolean;
  timeStamp?: Date | number;
  attributes?: A;
}
```

For instance, in `RdSlider` which is a custom element that has several unique attributes, the type definition is now:

```typescript
interface RdSliderAttributes {
  size?: string;
  height?: number;
  width?: number;
  orient?: string;
  min?: number | number[];
  max?: number | number[];
  position?: string;
  x?: number;
  y?: number;
  snapToCenter?: boolean;
  transform?: string;
  numberType?: 'int' | 'float';
}

RdControl<RdSliderAttributes>;
```

The reason for this change is to support @readymade/transmit. Passing an event from custom element to `BroadcastChannel` or any of the available channels in `Transmitter` is much simpler when the API is normalized.

### 3.0.0

Readymade 3.0.0 Large Glass brings project dependencies up to date, adds new features and introduces several bugfixes and enhancements.

### @readymade/core

- new: class methods `get$` and `getAll$ `shorthand for `querySelector` and `querySelectorAll`
- new: class methods `wait$` and `waitAll$` wait for elements that match the selector to attach to DOM until match is made with `Promise` like behavior.
- new: basic Declarative Shadow DOM compatibility
- fix: possible issues with setting template and state

### @readymade/dom

- fix: add `force` attribute to `TemplateRepeater` to fix an issue where the repeated template would not append inside `ShadowDOM`
- fix: `repeatr` could error when used in `ShadowDOM`

### @readymade/router

- feat: support for hash routing

### @readymade/ui

- new: configure joystick for int or float
- new: simulate a click on `RdButton`, making it controllable by another component
- new: `RdButtonPad` displays a grid of buttons, delegates button events
- new: add `channel` attribute set to the name of the `BroadcastChannel` to pipe form control values to a `BroadcastChannel` for dispatching to WebSocket, WebRTC, OSC
- new: provide readymade-ui.css so users can get CSS Variables for styling components
- new: `RdRadioGroup` has `vertical` attribute which displays the group vertically instead of horizontally
- fix: `RdButton` could display empty area where icon would be
- fix: `RdButton` label was user-selectable, making touch devices hard to use
- fix: `RdButton` was not dispatching submit event when type set to submit
- fix: `RdSlider` positioning in iOS
- fix: height scaled correctly for joystick

### Project

- new: support SSR with vite
- new: upgrade cypress
- new: use yarn 4

### BREAKING CHANGES

#### TemplateRepeater

`TemplateRepeater` became unstable over time and no longer supports nested template bindings.

Where you had an example like this before:

```

<template id="object-repeater" items="item of items">
  <ul class="is--large">
    <li repeat="item" foo="{{item.index}}">{{item.title}}</li>
  </ul>
</template>

```

the HTML should be updated so the HTML Template immediately wraps the content that is being looped over.

```
  <ul class="is--large">
    <template id="object-repeater" items="item of items">
         <li repeat="item" foo="{{item.index}}">{{item.title}}</li>
    </template>
  </ul>
```

#### primr

`primr` now scaffolds new projects with Vite 5 instead of parcel. Run `npx primr my-app` to start a new Readymade project in a directory named `my-app`.

Readymade is now built with a version of TypeScript that supports the proposed Decorator spec in ECMAScript. This project is still built with `experimentalDecorators` so you shouldn't see any breaking changes until Readymade migrates to the new spec. The project is now built with `typescript@~5.5.0`.

Readymade should support older versions of `node>15`. The project is now built with `node@20` and only actively tested with this version.

### Legacy

This version of Readymade is named ofter the work of Marcel Duchamp, an installation named "The Bridge Stripped Bare By Her Bachelors, Even", often referred to as "The Large Glass". Considered by many one of Duchamp's finest works, art handlers dropped the installation, cracking the glass. When questioned about it, Marcel Duchamp said he liked the work even more now that it was cracked. The installation hangs in the Philadelphia Museum of Art.

![Large Glass by Marcel Duchamp](https://github.com/user-attachments/assets/63bd08ff-15cd-4d2d-8864-13a35025ed7f)

## 2.1.0

- NEW @readymade/ui package includes UI library built with Web Components
- NEW support for form-associated custom elements using `FormElement class` and `delegatesFocus`
- NEW delegatesFocus property now supported when initializing ShadowDOM
- FIX style tag may not append to host `shadowRoot` for customized built-in elements
- FIX issues with `Repeater` and `Router` type definitions, may cause breaking change in development

## 2.0.1

- FIX issue with exported type definitions in @readymade/dom package

## 2.0.0 Bicycle Wheel

- NEW @readymade/dom package includes a collection of readymade components that extend from native HTML elements
- NEW @readymade/router package features a client-side router for navigating between custom element based views
- NEW `Repeater` and `TemplateRepeater` iterates over a data model and appends custom template to DOM
- NEW ability to set Shadow DOM mode to 'open' or 'closed' in Component Decorator
- NEW `$state` property exposes component state, use `getState()` (or whatever method is bound to `State`) as a best practice
- NEW development and testing environment
- FIX performance related issues with using state
- FIX issues with state when custom elements are dynamically added to DOM
- FIX issue when using Readymade components with hot module reloading with Parcel
- FIX issues with server side rendering

### BREAKING CHANGES

Several components that were previously exported from @readymade/core have been moved to the new @readymade/dom package. `CustomElement`, `PseudoElement`, and `StructuralElement` remain in @readymade/core, while every other class is now exported from @readymade/dom. This change was made to cut down on library size when bundlers can't treeshake @readymade/core, as is the case with Parcel. Rollup and Webpack can treeshake @readymade/core. Another reason for this change is @skatejs/ssr, the only known package that can server-side Readymade components, can't interpret customized built-in elements and only supports components that extend from HTMLElement.

State will no longer automatically update after changing properties directly on the Component class. While this approach was convenient, it is much more performant not to track instances of the class but rather instances of state. State is now exposed as this.\$state or by the getter used when declaring the @State decorator.

Several internal APIs were shifted around. Private APIs are prefixed with `ɵ`. Public APIs are exposed with `$`.

Readymade now requires node > 15.0.0 for server-side rendering due to EventTarget being shipped with the library.

## 2.0.0-beta.3

- FIX issue when using Readymade components with hot module reloading

## 2.0.0-beta.2

- FIX issue with server side rendering

## 2.0.0-beta.1

- FIX issue with server side rendering

## 2.0.0-beta.0

- NEW @readymade/dom package includes a collection of readymade components that extend from native HTML elements
- NEW @readymade/router package features a client-side router for navigating between custom element based views
- NEW `Repeater` and `TemplateRepeater` iterates over a data model and appends custom template to DOM
- NEW ability to set Shadow DOM mode to 'open' or 'closed' in Component Decorator
- NEW `$state` property exposes component state, use `getState()` (or whatever method is bound to `State`) as a best practice
- NEW development and testing environment
- FIX performance issues
- FIX issues with state when custom elements are dynamically added to DOM

BREAKING CHANGES

Several components that were previously exported from @readymade/core have been moved to the new @readymade/dom package. `CustomElement`, `PseudoElement`, and `StructuralElement` remain in @readymade/core, while every other class is now exported from @readymade/dom. This is to cut down on library size when bundlers can't treeshake @readymade/core, as is the case with Parcel. Rollup and Webpack should treeshake @readymade/core fine. Another reason for this change is @skatejs/ssr, the only known package that can server-side Readymade components, can't interpret anything but classes that extend from HTMLElement.

State will no longer automatically update after changing properties on the Component class. While this approach was convenient, it is much more performant not to track instances of the class but rather instances of state. State is now exposed as this.\$state or by the getter used when declaring the @State decorator.

Several internal APIs were shifted around. Private APIs are prefixed with `ɵ`. Public APIs are exposed with `$`.

## 1.2.0

- FIX performance improvements
- REMOVE check for `no-attr` attribute, make check automatic for non applicable attributes during change detection

## 1.1.2

- FIX automatic call to `customElements.define` should be opt out

## 1.1.1

- FIX issue that caused array values to not correctly update in some use cases
- ADD check for `no-attr` attribute on Elements to forego expensive change detection on attributes where not applicable

## 1.1.0

### BREAKING CHANGES

This release introduces improvements to the Component interface and internal state. These changes may effect your usage of Readymade. Please read the following to understand how to update components built with Readymade.

- ADD automatic call to `customElements.define` in Component decorator
- ADD `setState` now accepts string using dot, braket syntax to update deep values
- FIX issues when updating state that is an Object
- FIX issues with updating state

Manual calls to `customElements.define` are no longer required. Readymade will automatically call `customElements.define` using the `selector` property in the `@Component` decorator.

To update to `1.1.0`:

`npm install @readymade/core@^1.1.0`
`yarn upgrade @readymade/core@^1.1.0`

For autonomous custom elements:

1. Ensure the element has a `selector` defined in the `@Component` decorator.
2. Remove any call to `customElements.define` in your code.

```typescript
@Component({
  selector: 'x-atom',
  style: css`
      :host {
        display: flex;
      }
	`,
  template: html`
    <span>{{state}}</span>
	`,
})
class AtomComponent extends CustomElement {
```

For customized built-in elements:

1. Ensure the element has a `selector` defined in the `@Component` decorator.
2. Ensure the element has a `custom` property defined in the `@Component` decorator.
3. Remove any call to `customElements.define` in your code.

```typescript
@Component({
  selector: 'my-button',
  custom: { extends: 'button'},
  style: css`
		:host {
			cursor: pointer;
		}
	`,
  template: html`
   <span>{{model}}</span>
	`,
})
class MyButtonComponent extends ButtonComponent {
```

### IMPROVEMENTS

This release also fixes several issues when working with internal state.

Now its possible to define properties on state as Objects and Arrays.

```typescript
export class TreeState {
  public arrayModel = [
    'Node 1',
    'Node 2',
    'Node 3',
    'Node 4',
    'Node 5',
    'Node 6',
    'Node 7',
  ];
  public objectModel = {
    foo: {
      bar: {
        baz: 'bbb',
      },
    },
  };
}
```

After binding to state with the `@State` decorator...

```typescript
@State()
public getState() {
  return new TreeState();
}
```

reference objects and arrays in the component's template

```html
<x-node model="{{objectModel.foo.bar.baz}}"></x-node>
<x-node model="{{arrayModel[0]}}"></x-node>
```

and update deeply nested objects with `setState`.

```typescript
this.setState('objectModel.foo.bar', { baz: 'foo' });
```

This represents a substantial improvement over the state mechanisms introduced in 1.0.0.

## 1.0.2

- FIX issues with server-side rendering components

## 1.0.1

- FIX issue that caused styles to display null in Dev Tools when style wasn't specified

## 1.0.0

- Initial production release 🎉

## 1.0.0-beta.5

- NEW 'Hello World' is ~1Kb, current size is 1.1Kb gzipped
- FIX issue that caused 'selector' property to be mandatory in Component decorator
- DEPRECATED state property from < 1.0.0-beta.3
- UPDATE readme and documentation

## 1.0.0-beta.4

- DEPRECATED state property, DO NOT set state directly
- NEW @State method decorator

Please update your components to use the new @State decorator. See examples in the repo for usage.
state property will be deprecated in 1.0.0 release.

## 1.0.0-beta.3

- UPDATE data binding is now non-deformational
- FIX issues with type definition generation

## 1.0.0-beta.2

- FIX main field in package.json to point to FESM instead of UMD module
- NEW type definitions exported to modules/core/index.d.ts

## 1.0.0-beta.1

- NEW setState method allows setting global properties on state
- FIX issues when setting state with classes inheriting from CustomElement
- FIX several issues with types, stricter types now throughout library
- FIX issue where bound text could print undefined or null, now defaults to empty string

## 1.0.0-beta.0

- Initial beta release
