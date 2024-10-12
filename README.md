# readymade

JavaScript microlibrary for developing Web Components with Decorators that uses only native spec to provide robust features.

- 🎰 Declare metadata for CSS and HTML ShadowDOM template
- ☕️ Single interface for 'autonomous custom elements' and 'customized built-in elements'
- 🏋️‍ Weighing in ~1.2Kb for 'Hello World' (gzipped)
- 🎤 Event Emitter pattern
- 1️⃣ One-way data binding
- 🖥 Server side renderable
- 🌲 Treeshakable

Chat with us on [Dischord](https://discord.gg/xzsnBfD3fu).

For more information, read the [Readymade documentation](https://readymade-ui.github.io/readymade).

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

For the UI library:

```
npm install @readymade/ui
```

### Development

This repo includes a development server built with Vite.

Fork and clone the repo. Install dependencies with yarn.

```
yarn install
```

To develop, run `yarn start`. This will spin up a Vite development server at http://localhost:4443.

For working on the documentation portal use `yarn start:client`.

Production is built with `yarn build`. This will generate a client and server that can be deployed.

For unit and e2e tests, run `yarn build` then `yarn test`.

Use `yarn test:open` to open a GUI and run tests interactively.

### Production

To build the library for production, i.e. to use as a local dependency in another project run `yarn build:lib`.
