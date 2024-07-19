<p align="center">
  <img src="https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/logo.png">
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/SkwalExe/WinMB.js?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/SkwalExe/WinMB.js?style=for-the-badge">
  <img src="https://img.shields.io/github/issues/SkwalExe/WinMB.js?color=blueviolet&style=for-the-badge">
  <img src="https://img.shields.io/github/forks/SkwalExe/WinMB.js?color=teal&style=for-the-badge">
  <img src="https://img.shields.io/github/issues-pr/SkwalExe/WinMB.js?color=tomato&style=for-the-badge">

</p>

<p align="center">🪟 Windows-like dialogue boxes for your website</p>

# WinMB.js

<p align="center">
  <img src="https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/banner.png">
</p>

# Setting up ⬇️

### Package Managers

Install the NPM package using your package manager.

```bash
# npm
npm install @skwalexe/winmb

# yarn
yarn add @skwalexe/winmb
```

Then import the library.

```js
// For CommonJS
const WinMB = require('@skwalexe/winmb')

// For ES Modules
import WinMB from '@skwalexe/winmb'
```

### Import with \<script\> tag

If you use this method, the library will be available globally as `WinMB`.

```js
<script src="https://cdn.jsdelivr.net/npm/@skwalexe/winmb@0.1.4/dist/winmb.umd.js"></script>
```

# Using this library 📦

This library exports a `WinMB` class which acccepts the following parameters:

- `assetsUrl / required`: WinMB needs to load **remote assets** such as css stylesheets, sounds, and images, which you can host on your own servers. This parameter is used to tell WinMB where it can find these assets. You must provide a **base url**, to which WinMB will just append the requested asset's file name. If you don't want to host the assets yourself, you can use JSDelivr like in the example below.

```js
const wmbEngine = WinMB('https://cdn.jsdelivr.net/gh/SkwalExe/WinMB.js@0.1.4/src/assets/')
```

Once you instanciated the `WinMB` class, it exposes the follwing methods:


- `wmbEngine.removeAll()`: Removes all the dialogue boxes from the page.
- `wmbEngine.show()`: Creates and displays a new dialogue box.

### `wmbEngine.removeAll()`

This method will remove all the dialogue boxes from the page. It doesn't use any parameters and doesn't return anything.

```js
wmbEngine.removeAll()
```

### `wmbEngine.show()`

This method will create a new dialogue box and display it on the page. All the parameters will be demonstrated later on. It accepts the following parameters:

- `title: string`: The message box's title.
- `message: string`: The message box's content.
- `?type: string`: The message box type, one of: `error`, `info`, or `warning`. This parameter will change the message box's icon and sound. **Default: `error`**
- `?buttons: object[]`: **Default: one `ok` button**. An array of objects, each with the following properties:
    - `text: string`: The text displayed inside the button.
    - `?value: string | number | boolean`: The value returned by `show()` when the button is clicked. If not supplied, the return value will be the `text` property.
- `?position: string | [x, y]`: If you supply a string, it must be `random`, or `default`. If you supply an array, the box will be placed at coordinates `(x, y)`.
    - `random`: The box will be placed at random coordinates on the page.
    - `default`: The boxes will follow the default windows bahavior.

This function returns a `Promise()` which will resolve when a button is clicked or when the message box is closed. The return value will be the clicked button's corresponding value (see `buttons`), and `false` if the box was dismissed with the `close` button.


# Contributing 🤝

Please, open an issue if you have any suggestion or if you found a bug. I will try to fix it as soon as possible.

## General Info About the Project 📖

This is a simple library that can create Windows message boxes on a web page. It uses the following technologies for the development process and for the build pipeline:

- TypeScript for typechecking.
- Babel.js for creating polyfills (browser retro-compatiblity).
    - Node that we will only create polyfills for the final UMD bundle, and not for the CJS/ESM builds because creating polyfills is in my opinion the responsability of the library users. 
- Rollup for UMD bundle generation.
- ESLint for linting.
- Prettier.js for formatting.


This library uses `pnpm` as a package manager. You can install it with:

```bash
sudo npm install -g pnpm
```

## Setting up the development environment 🖥️

- [Fork this repository to your own GitHub account.](https://github.com/SkwalExe/WinMB.js/fork)
- Clone your fork locally.

```bash
git clone https://github.com/YOUR_USERNAME/WinMB.js
cd ./WinMB.js
```

- Install (dev)dependencies

```bash
pnpm install
```

- Run the pnpm `serve` script to start a local development server on port `10001`
    - This will continuously rebuild the UMD bundle and reload the page.

```bash
pnpm run serve
```

- Open the local development server on `https://localhost:10001/` and open the project in your IDE.

## Files and directories 📂

> Unreferenced files are just not important.

__Configuration Files:__ ⚙

- `babel.config.js`: Babel configuration file.
- `eslint.config.mjs`: ESLint configuration file.
- `rollup.config.mjs`: Rollup configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: NPM package configuration.

__Source:__ 🔢
- `src/assets/`: Contains library assets (CSS styleshetts, audio files, images...)
- `src/main.ts`: Library entry point (only imports/exports)

__Builds:__ 👷

- `dist/lib-cjs/`: CommonJS build.
- `dist/lib-esm/`: ESM build.
- `dist/winmb.umd.js`: UMD bundle.

__Other:__ 📄

- `assets/`: Assets for the GitHub repo only.
- `index.html`: Simple HTML page for testing the library.

## Creating a pull request 👍

If you'd like to contribute, please open an empty pull request and provide an explanation of your proposed changes. Once I approve it, you can begin your work. It's always disheartening to reject a pull request after someone has invested a lot of time and effort into it. 😿

- Create a branch for your contribution

```bash
git checkout -b my-new-feature
```

- When you finished your changes, you must check your code's formatting and linting and fix all the errors.

```bash
pnpm run lint:fix # check for linting errors
pnpm run check-types # check for type errors
pnpm run format # comply with foramtting rules
```

- After that, add your changes to `CHANGELOG.md` and update the README if needed.

- Do not increment the NPM package version yourself, the maintainer will do it.

- Then, you can commit your work and push to your fork.

```bash
git add --all 
git commit -m "Added a new feature"
git push -u origin my-new-feature
```

- Finally, you can create your pull request from your fork repo's github page.

## PNPM scripts

- `lint`: Perform ESLint checks.
- `format`: Format codebase with prettier.
- `clean`: Remove `./dist/`.
- `build:cjs`: Build CommonJS version from source.
- `build:esm`: Build ESM version from source.
- `build:umd`: Build UMD bundle from ESM version.
- `watch-esm`: Rebuid ESM version on any detected change.
- `watch-umd`: Creates local dev server, rebuild UMD bundle and reload the server automatically on any change detected from ESM version.
- `build`: Build all versions: ESM, CJS, UMD bundle.
- `serve`: Rebuild ESM and UMD bundle on any detected change, while creating a local dev server.

# Examples 📸

### Title and message

```js
wmbEngine.show("I am a title", "I am a message")
```

![Example 1](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example1.png)

---

### Box types

```js
wmbEngine.show("skwal.net", "Message box types", "info")
```

![Example 2](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example2.png)

```js
wmbEngine.show("skwal.net", "Message box types", "error")
```

![Example 3](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example3.png)


```js
wmbEngine.show("skwal.net", "Message box types", "warning")
```

![Example 4](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example4.png)

### Buttons

```js
wmbEngine.show("skwal.net", "Buttons", "info", [{text: "Hello", value: true}, {text: "World", value: false}])
```

![Example 5](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example5.png)

---

### Position

```js
wmbEngine.show("skwal.net", "Default position", "info", [{text: "Hello", value: true}], "default")
```

![Example 6](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example6.png)

```js
wmbEngine.show("skwal.net", "Random position", "warning", [{text: "Hello", value: true}], "random")
```

![Example 7](https://raw.githubusercontent.com/SkwalExe/WinMB.js/main/assets/example7.png)


