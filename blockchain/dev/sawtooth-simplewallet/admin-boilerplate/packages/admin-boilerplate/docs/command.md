# Command
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Contents**

- [Command](#command)
  - [Command Line Commands](#command-line-commands)
    - [Get Model](#get-model)
    - [Generate Model](#generate-model)
    - [Development](#development)
    - [Building](#building)
    - [Testing](#testing)
    - [Storybook](#storybook)
    - [Analyzes JavaScript Bundles](#analyzes-javascript-bundles)
    - [i18next Translation](#i18next-translation)
    - [Ejecting](#ejecting)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Command Line Commands
In the front-end directory `/packages/admin-boilerplate/`,\
You can run:


### Get Model

```shell
yarn get-model
```

When the Back-end side is ready, and you want to generate your model for the Front-end.\
First of all, you must get the models from the Back-end.\
This script was made to *get the model from the Back-end!*\

**Note:** 
- This script gets the model through API as the Super Administrator role.
- This script will overwrite the content of `scripts/generators/model-page/model-spec.json`.
**Reference:** [web/admin-boilerplate!86](https://git.baikal.io/web/admin-boilerplate/-/merge_requests/86)


### Generate Model

```shell
yarn generate
```

After you `yarn get-model`, you can run `yarn generate` to generate a model page. You must enter name of model page that you want to generate. 

**Note:** 
- Select the name of collectionName in the file `src/containers/HomePage/collectionNames.json`
- You can see more about generator in the document [generators.md](/packages/admin-boilerplate/docs/generators.md).


### Development

```shell
yarn start
```

Running the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

**Note:** This command will load the `.env` file.





### Building

```shell
yarn build
```

Builds the app for production in the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### Testing

```shell
yarn test
```

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Storybook

```shell
yarn storybook
```
It will start Storybook locally and return the address.

```shell
yarn build-storybook
```
It will build Storybook as a static web application.

### Analyzes JavaScript Bundles

```shell
yarn analyze
```

Analyzes JavaScript bundles using the source maps. This helps you understand where code bloat is coming from.



### i18next Translation

```shell
yarn lang
```

Traverse your Javascript code in order to find i18next translation keys and export into language json files.




### Ejecting

```shell
yarn eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
