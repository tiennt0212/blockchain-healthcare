<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
# Frontend of Admin-boilerplate

**Tables of Contents**

- [Frontend of Admin-boilerplate](#frontend-of-admin-boilerplate)
- [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites & Installation](#prerequisites--installation)
    - [Install packages (Optional)](#install-packages-optional)
    - [Configure environment variables](#configure-environment-variables)
  - [Quick Start Guide](#quick-start-guide)
  - [Quick Start Scripts for Front-end developers](#quick-start-scripts-for-front-end-developers)
- [Other Documentation](#other-documentation)
- [Learn More](#learn-more)
  
- [Other Documentation](#other-documentation)
- [Learn More](#learn-more)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduction
**When do you need this Admin-Boilerplate?**

You have a Back-end side and you would like an Admin Page to manage it.

This project provides the tool that helps the developers automate the creation of the Admin page from a Data model file, so there is no need to config the new Admin Page project from scratch anymore.

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)*
## Features

- Automate the creation of the Admin page from a Data model file.
- Generate the pages by using the CLI (Command line interface).

**About this Documentation**

Help you to understand:

- Features of Admin-boilerplate package.
- Technologies used in the project.
- How to use this package.

## Tech Stack

Admin-boilerplate uses a number of technical to work properly:
* Packages manager: [Yarn](https://yarnpkg.com/getting-started) - Yarn is a package manager for your code. It allows you to use and share code with other developers quickly, securely, and reliably so you don't ever have to worry.
* Router: [React Router DOM](https://www.npmjs.com/package/react-router-dom) - The react-router-dom package contains bindings for using React Router in web applications. Please see the [React Router - Getting Started Tutorial](https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md) guide for more information on how to get started with React Router.
* Styles
  * [StyledComponent](https://styled-components.com/docs) - allows you to write actual CSS code to style the components. It also removes the mapping between components and styles.
  * [StoryBook](https://storybook.js.org/docs/) - An open source tool for building UI components and pages in isolation.
  * [Antd Framework](https://ant.design/docs/react/introduce) - A design system for enterprise-level products.
* State management: [Rematch](https://rematchjs.org/docs/) - Rematch is Redux best practices without the boilerplate. No more action types, action creators, switch statements or thunks.
* Multi-language: [react-i18next](https://react.i18next.com/) - A powerful internationalization framework for React which is based on i18next.
* Hooks: more details in [Hooks - Author: Mr. Linh](https://git.baikal.io/web/admin-boilerplate/-/blob/canary/packages/admin-boilerplate/docs/hooks.md)
  * useDispatch: get function from `reducers` or `effects` of multiple models in rematch models store.
  * useSelect: get function from `selectors` of multiple models in rematch models store.
  * useSelector: get `state` in rematch models store.
* Server connector: Restful API
  
# Getting Started
*Let's create an admin boilerplate page in seconds!!!*
## Prerequisites & Installation

In order to use this project, make sure you have installed yarn, nodejs, and lerna.

After cloning this project. For more convenience, please change the directory into ./packages/admin-boilerplate

```bash
cd ./packages/admin-boilerplate 
```

### Install packages (Optional)

This step is **optional**. If you installed packages by using the `lerna bootstrap` before, you can skip this step.  
To install packages, open the terminal (bash, cmd,...) and enter the following command:

```bash
$ yarn
# Or using npm
npm install
```

### Configure environment variables

You can configure it with **just one command** like this.

```bash
cat .env.example > .env 
```

Or **manually**

1. Create `.env` file.  

2. Open the `.env.example` file and copy all its code.

3. Paste that code to `.env` file and configure.

## Quick Start Guide

Once you have this project and complete all the steps in [Prerequisites & Installation](#prerequisites--installation),\
You can start the Project with only one command (as below).
```bash
yarn start
```

If there are no problems, the Terminal will say "success" and you can view the Admin-boilerplate in your browser at [http://localhost:3000](http://localhost:3000)

```bash
Compiled successfully!

You can now view admin-boilerplate in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.11:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

```
After log in with a Super Admin account, you can see the Admin Site.\
**Your admin site is empty.**\
Because it doesn't have any models. You need to create models by following these steps.\

1. Get model from Back-end side.
   
    ```bash
    yarn get-model
    ```
    If successfully, the result will as below:
    ```bash
    yarn run v1.22.15
    $ node scripts/getModel/index.js
    INFO: Get token successfully!
    INFO: Get model successfully!
    Done in 0.59s.
    ```
  
    All models returned from the Back-end will be updated to `./scripts/generators/model-page/model-spec.json`.\
    You can open it and have a look. You may need the attribute `collectionName` for the next step.
2. Generate model.
    ```bash
    yarn generate
    ```
    The script's menu will be displayed like this. You can use the up and down arrows to select an option.\
    Because you need to put something on the Admin Site. The `modelPage` option is suitable.
    ```bash
    yarn run v1.22.15
    $ plop --plopfile scripts/generators/index.js && yarn lang
    ? [PLOP] Please choose a generator. (Use arrow keys)
    ❯ modelPage - Generate model page 
      component - Generate a component 
      container - Create new container 
      testGenerator - Test generator
    ```
    
    You will then be asked: `What should it be called?`\
    For this question, your input is also used for filenames and directory names.\
    **For example**, among all the models received from the back-end, it has **Order**. I want to create it.\
    So I type the input as  `Order` (you can also enter anything: `ABC`, `Hello`, `Lecle`,...)

    ```bash
    yarn run v1.22.15
    $ plop --plopfile scripts/generators/index.js && yarn lang
    ? [PLOP] Please choose a generator. modelPage - Generate model page
    ? What should it be called? Order
    ```

    The last question: `What is model spec?`\
    Your input **must be correct** for this question.\
    For example, I want the model **Order**. So i enter the corresponding `collectionName` of Order - is `orders`.
    ```bash
    yarn run v1.22.15
    $ plop --plopfile scripts/generators/index.js && yarn lang
    ? [PLOP] Please choose a generator. modelPage - Generate model page
    ? What should it be called? Order
    ? What is model spec? orders
    ```
    Once you complete this input and Submit, the script will create multiple folders and files for your **Order**.\
    Your model will be located at `./src/containers/`

  *Tadaaa!!! You have created an Order Page for the Admin Site* 

3. You can go back to the browser on [http://localhost:3000](http://localhost:3000)

## Quick Start Scripts for Front-end developers
In the front-end directory `/packages/admin-boilerplate/`, you can run:

- `yarn get-model`: Get the model from the Back-end.
- `yarn generate`: Generate the model with the name of collectionName. *([Document](packages/admin-boilerplate/docs/generators.md) for more details about `generate` script)*
- `yarn start`: Run the app in the development mode.

For more infomation and scripts, you can read [this document](docs/command.md).

# Other Documentation
- [Command](/packages/admin-boilerplate/docs/command.md): Getting the most out of this boilerplate.
- [Data-layer](/packages/admin-boilerplate/docs/data-layer.md): Idea to handle backend layer.
- [Generators](/packages/admin-boilerplate/docs/generators.md): Admin boilerplate generator.
- [Home-page](/packages/admin-boilerplate/docs/home-page.md): Instructions for Home Page.
- [Hooks](/packages/admin-boilerplate/docs/hooks.md): Instructions for applying Rematch Hooks.
- [Multiple-language](/packages/admin-boilerplate/docs/multiple-language.md): Setting translation with react-i18next.
- [Project-structure](/packages/admin-boilerplate/docs/project-structure.md): Explain the project structure.
- [Store](/packages/admin-boilerplate/docs/store.md): Lazy loading model and Including middleware in Rematch.
- [Storybook](/packages/admin-boilerplate/docs/storybook.md): Getting Started with Storybook.
- [Utils](/packages/admin-boilerplate/docs/utils.md): Code Splitting the project.
  
# Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
