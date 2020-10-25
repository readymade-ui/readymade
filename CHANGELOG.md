# CHANGELOG

## 2.0.0-beta.0

- NEW @readymade/dom package includes a collection of readymade components that extend from native HTML elements
- NEW @readymade/router package features a client-side router for navigating between custom element based views
- NEW `r-repeatr` and `r-repeat` components loop over a data model to display a custom template. 
- NEW set Shadow DOM mode to 'open' or 'closed' in Component Decorator
- NEW `$state` property exposes component state, use `getState()` (or whatever method is bound to `State`) as a best practice
- NEW development and testing environment 
- FIX performance issues
- FIX issues with state when custom elements are dynamically added to DOM


BREAKING CHANGES

Several components that were previously exported from @readymade/core have been moved to the new @readymade/dom package. `CustomElement`, `PseudoElement`, and `StructuralElement` remain in @readymade/core, while every other class is now exported from @readymade/dom. This is to cut down on library size when bundlers can't treeshake @readymade/core, as is the case with Parcel. Rollup and Webpack should treeshake @readymade/core fine. Another reason for this change is @skatejs/ssr, the only known package that can server-side Readymade components, can't interpret anything but classes that extend from HTMLElement.

State will no longer automatically update after changing properties on the Component class. While this approach was convenient, it is much more performant not to track instances of the class but rather instances of state. State is now exposed as this.$state or by the getter used when declaring the @State decorator.

Several internal APIs were shifted around. Private APIs are prexied with `ɵ`. Public APIs are exposed with `$`. 

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
  public arrayModel = ['Node 1', 'Node 2', 'Node 3', 'Node 4', 'Node 5', 'Node 6', 'Node 7'];
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
 this.setState('objectModel.foo.bar', { baz: 'foo' } );
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
