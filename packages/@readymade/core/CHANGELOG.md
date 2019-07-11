# CHANGELOG

## 1.0.0

Initial release!

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
