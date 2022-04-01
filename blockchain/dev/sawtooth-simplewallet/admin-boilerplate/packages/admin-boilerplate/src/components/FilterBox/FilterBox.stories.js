import FilterBox from './FilterBox';
import { ALL_ATTRIBUTES } from '../../utils/constants';
import { generateFiltersInfo } from '../../utils/app';

export default {
  title: 'Components/FilterBox',
  component: FilterBox,
};

const Template = (args) => <FilterBox {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Group-Users - Filters',
  description: 'Set the conditions to apply to filter the entries',
  filterInfos: generateFiltersInfo(ALL_ATTRIBUTES),
};
