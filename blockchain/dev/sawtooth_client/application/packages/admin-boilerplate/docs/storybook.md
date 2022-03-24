<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**

- [Getting Started with Storybook](#getting-started-with-storybook)
    - [How to show UI component](#how-to-show-ui-component)
    - [Development scripts](#development-scripts)
            - [`yarn storybook`](#yarn-storybook)
    - [Related Docs](#related-docs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Getting Started with Storybook

## How to show UI component

1/ Create a file ending with .stories.js in the components folder.

2/ Export default metadata controls with title and component.

Ex: 

    export default {
        title: 'Components/$componentName',
        component: $componentName,
        argTypes: { onClick: { action: 'clicked' } }, (optional) // Add args.
    }   

3/ Use the named exports of a [CSF](https://storybook.js.org/docs/react/api/csf) file to define your component’s stories. (We recommend you use UpperCamelCase for it).

Ex: 
`export const Primary = () => <Button primary>Button</Button>;`

4/ Using args

// We create a “template” of how args map to rendering

`const Template = (args) => <Button {...args} />;`


// Each story then reuses that template

`export const Primary = Template.bind({});
Primary.args = { background: '#ff0', label: 'Button' };`

`export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: '😄👍😍💯' };`

`export const Tertiary = Template.bind({});
Tertiary.args = { ...Primary.args, label: '📚📕📈🤓' };`

## Development scripts

#### `yarn storybook`
> It will start Storybook locally and return the address.
#### `yarn build-storybook`
> It will build Storybook as a static web application.

## Related Docs
https://storybook.js.org/docs/react/get-started/introduction