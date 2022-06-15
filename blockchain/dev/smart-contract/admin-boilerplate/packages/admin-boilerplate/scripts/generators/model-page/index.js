const prompts = require('../utils/prompts');
const buildBasePath = require('../utils/buildBasePath');
const getModelSpec = require('./utils/getModelSpec');
const transformEslint = require('../utils/transform-eslint');
const srcPath = '../../src';

module.exports = {
  description: 'Generate model page',
  prompts: [prompts.NAME, prompts.MODEL_SPEC],
  actions: (data) => {
    const listContainerName = 'List';
    const formContainerName = 'CreateUpdateForm';
    const buildCreatePath = buildBasePath(`${srcPath}/containers/{{properCase name}}/Form`);
    const buildListPath = buildBasePath(`${srcPath}/containers/{{properCase name}}/List`);
    const modelSpec = getModelSpec(data.model);
    const modelAttr = [];
    Object.entries(modelSpec.attributes).forEach(([key, value]) => {
      if (value && value.show) {
        const obj = { attr_name: key }; // just a normal field
        const { type, model, collection, displayField } = value || {};
        if (type === 'boolean') obj['boolean'] = true;
        else if (type === 'datetime') obj['datetime'] = true;
        else if (model === 'file' || collection === 'file') obj['file'] = true;
        // is a media field
        else if (displayField) obj['displayField'] = displayField; // is a relational field
        modelAttr.push(obj);
      }
    });
    return [
      // Add attributes file
      {
        type: 'add',
        path: `${srcPath}/containers/{{properCase name}}/attributes.js`,
        templateFile: './model-page/attributes.js.hbs',
        data: { attributesObj: JSON.stringify(modelSpec.attributes) },
        transform: transformEslint,
      },
      // Add Model-Page
      {
        type: 'add',
        path: buildListPath(`/{{camelCase model}}Model.js`),
        templateFile: './model-page/model.js.hbs',
        abortOnFail: true,
        transform: transformEslint,
      },
      {
        type: 'add',
        path: buildCreatePath(`/${formContainerName}.jsx`),
        templateFile: './model-page/form/container.js.hbs',
        abortOnFail: true,
        data: {
          formContainer: formContainerName,
        },
        transform: transformEslint,
      },
      {
        type: 'add',
        path: buildCreatePath(`/index.js`),
        templateFile: './utils/index.js.hbs',
        data: () => ({ wantLoadable: true, customName: formContainerName }),
        transform: transformEslint,
      },
      {
        type: 'add',
        path: buildListPath(`/__tests__/{{camelCase model}}Model.test.js`),
        templateFile: './model-page/model.test.js.hbs',
        abortOnFail: true,
        transform: transformEslint,
      },
      {
        type: 'add',
        path: buildListPath(`/${listContainerName}.jsx`),
        templateFile: './model-page/list/container.js.hbs',
        data: { attr: modelAttr },
        abortOnFail: true,
        transform: transformEslint,
      },
      {
        type: 'add',
        path: buildListPath(`/index.js`),
        templateFile: './utils/index.js.hbs',
        data: () => ({ wantLoadable: true, customName: listContainerName }),
        transform: transformEslint,
      },
      // Add File - skip if exists
      {
        type: 'add',
        path: `${srcPath}/utils/routeConstants.js`,
        templateFile: './injectable/routeConstants.js.hbs',
        skipIfExists: true,
        transform: transformEslint,
      },
      {
        type: 'add',
        path: `${srcPath}/Routes.jsx`,
        templateFile: './injectable/routes.jsx.hbs',
        skipIfExists: true,
        transform: transformEslint,
      },
      {
        type: 'add',
        path: `${srcPath}/utils/menu.js`,
        templateFile: './injectable/menu.js.hbs',
        skipIfExists: true,
        transform: transformEslint,
      },
      // Modify Route and Menu
      {
        type: 'modify',
        path: `${srcPath}/utils/routeConstants.js`,
        pattern: /(};)/gi,
        template: `  {{constantCase name}}_LIST: '/{{kebabCase name}}',\r\nCREATE_{{constantCase name}}: '/{{kebabCase name}}-create',\r\nEDIT_{{constantCase name}}: '/{{kebabCase name}}-edit',\r\n$1`,
        transform: transformEslint,
      },
      {
        type: 'modify',
        path: `${srcPath}/Routes.jsx`,
        pattern: /([\r\n]function Routes\(\) {)/gi,
        template: `import {{properCase name}}Page from 'containers/{{properCase name}}/List';\r\nimport Create{{properCase name}} from 'containers/{{properCase name}}/Form';\r\n$1`,
        transform: transformEslint,
      },
      {
        type: 'modify',
        path: `${srcPath}/Routes.jsx`,
        pattern: /(<Switch>)/gi,
        template: `$1\r\n<ProtectedRoute path={{curly true}}ROUTES.{{constantCase name}}_LIST{{curly}} exact component={{curly true}}{{properCase name}}Page{{curly}} />\r\n<ProtectedRoute path={{curly true}}ROUTES.CREATE_{{constantCase name}}{{curly}} exact component={{curly true}}Create{{properCase name}}{{curly}} />\r\n<ProtectedRoute path={{curly true}}ROUTES.EDIT_{{constantCase name}}{{curly}} exact component={{curly true}}Create{{properCase name}}{{curly}} />`,
        transform: transformEslint,
      },
      // Add items to menu
      {
        type: 'modify',
        path: `${srcPath}/utils/menu.js`,
        pattern: /(];)/gi,
        template: `  { key: '{{camelCase name}}', title: '{{titleCase name}}', subMenu: [ { key: ROUTES.{{constantCase name}}_LIST, title: '{{titleCase name}} List', path: ROUTES.{{constantCase name}}_LIST }, { key: ROUTES.CREATE_{{constantCase name}}, title: 'Create {{titleCase name}}', path: ROUTES.CREATE_{{constantCase name}} } ] },\r\n$1`,
        transform: transformEslint,
      },
    ];
  },
};
