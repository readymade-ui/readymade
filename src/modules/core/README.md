# readymade

JavaScript microlibrary for developing Web Components with Decorators that uses only native spec to provide robust features.

- 🎰 Declare metadata for CSS and HTML ShadowDOM template
- ☕️ Single interface for 'autonomous custom elements' and 'customized built-in elements'
- 🏋️‍ Weighing in ~1.2Kb for 'Hello World' (gzipped)
- 🎤 Event Emitter pattern
- 1️⃣ One-way data binding
- 🖥 Server side renderable
- 🌲 Treeshakable

Chat with us on [Dischord](https://discord.gg/8GDKfv).

For more information, read the [Readymade documentation](https://readymade-ui.github.io).

### Getting Started

Install Readymade:

```
npm install @readymade/core
```

If you want to develop with customized built-in elements or Readymade's Repeater components:

```
npm install @readymade/dom
```

If you want to use the client-side router:

```
npm install @readymade/router
```

### Development

This repo includes a development server built with Parcel.

Fork and clone the repo. Install dependencies with yarn.

```
yarn install
```

To develop, run `yarn dev`. This will spin up a local Parcel development server at http://localhost:4444.

Available routes are specified in src/client/app/router.ts.

For unit and e2e tests, run `yarn build` then `yarn test`.

Use `yarn test:open` to open a GUI and run tests interactively.

### Production

To build the library for production, i.e. to use as a local dependency in another project run `yarn build:lib`.
