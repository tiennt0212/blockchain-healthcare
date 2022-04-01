import { TotalCounter } from './TotalCounter';

export default {
  title: 'Components/TotalCounter',
  component: TotalCounter,
};

const Template = (args) => {
  return <TotalCounter {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  total: 0,
};
