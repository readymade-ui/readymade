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

For more information, read our [Readymade documentation](https://readymade-ui.github.io/readymade/).

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
