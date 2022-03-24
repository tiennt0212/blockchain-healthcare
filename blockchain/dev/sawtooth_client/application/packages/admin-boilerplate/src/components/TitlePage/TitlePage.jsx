import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const StyledTitlePage = styled(Title)`
  margin-bottom: 12px;
  text-align: ${(props) => (props.align ? props.align : 'left')};
`;

export const TitlePage = ({ titleText, align }) => {
  return (
    <StyledTitlePage level={4} align={align}>
      {titleText}
    </StyledTitlePage>
  );
};

TitlePage.propTypes = {
  titleText: PropTypes.string.isRequired,
  align: PropTypes.string,
};
