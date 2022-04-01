<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Project Structure](#project-structure)
  - [`.storybook/`](#storybook)
  - [`build/`](#build)
  - [`config/`](#config)
  - [`docs/`](#docs)
  - [`node_modules/`](#node_modules)
  - [`public/`](#public)
  - [`scripts/`](#scripts)
  - [`src/`](#src)
  - [`.babelrc.js`](#babelrcjs)
  - [`.env.example`](#envexample)
  - [`.npmrc`](#npmrc)
  - [`.prettierignore`](#prettierignore)
  - [`.prettierrc`](#prettierrc)
  - [`CHANGELOG.md`](#changelogmd)
  - [`README.md`](#readmemd)
  - [`jsconfig.json`](#jsconfigjson)
  - [`package.json`](#packagejson)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Project Structure

## `.storybook/`
Storybook is configured via this folder which contains various configuration files.

## `build/`
Your production code will be placed here, the final package ready to install in your server. No changes are necessary here as this is automatically generated from your source files.
## `config/`

## `docs/`
Contains Front-end documentation.
## `node_modules/`
Contains all the javascript dependencies, you don't need to worry about this and also you should't modify any file there.
## `public/`
- The public folder contains the HTML file so you can tweak it, for example, to set the page title. The `<script>` tag with the compiled code will be added to it automatically during the build process.
- Public folder is inspired by `create-react-app`. So you can refer from the [document](https://create-react-app.dev/docs/using-the-public-folder/).

## `scripts/`
Contains some Front-end Javascript such as: `build`, `test`, `start`,`get-model`, `generate`, ...\
These are useful scripts for Front-end developers when participating in this project. 
## `src/`
All of the source code is contained here: assets, js, jsx, scss, etc. **Any changes you want to make to the website must be done here.**

- `__tests__`: 
- `assets/`: All the images, icons, static js files and the fonts needed to run the site. Any new assets must be placed here.
- `components/`: contains dumb React components which depend on containers for data.
- `containers/`: contains React components which are connected to the redux store.
- `hooks/`: contains React hooks utils.
- `server`: 
- `store/`: contains `redux`, `rematch` config and rematch global `model`s.
- `utils/`: contains js utils which are shared to the react components.
- `App.css`:
- `App.js`:
- `config.js`:
- `i18n.js`: React i18next config file for multiple language setup.
- `index.js`: Main file for the beginning of the project.
- `reportWebVitals.js`:
- `Routes.jsx`: contains links to all other pages
- `setupTests.js`:

## `.babelrc.js`
Where the Babel settings are set as well as the settings for pressets and plugins.

## `.env.example`
A simple text configuration file for controlling this project environment constants.

## `.npmrc`
The `npm config` files

## `.prettierignore`
Use `.prettierignore` to ignore (i.e. not reformat) certain files and folders completely.

## `.prettierrc`
Prettier configuration.

## `CHANGELOG.md`
Logs all the changes made to this project.

## `README.md`
`README` is a text file that acts as the document for a project or directory.

## `jsconfig.json`
The presence of `jsconfig.json` file in a directory indicates that the directory is the root of a JavaScript Project.

## `package.json`
When you run the command `yarn install`, the packages installed are the ones listed in this file with the version that were installed, if you need to add more packages you can run the command:

- `yarn add package_name` for dependencies.
- `yarn add package_name -D` for devDependencies.

then a new package will be installed in the `node_modules` folder and the `package.json` will be updated with a new line of the package added.
