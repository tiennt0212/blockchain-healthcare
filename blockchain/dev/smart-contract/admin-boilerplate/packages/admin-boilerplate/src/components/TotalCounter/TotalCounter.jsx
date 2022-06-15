import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../Styles/Colors';
import { useTranslation } from 'react-i18next';

const StyledTotalCounter = styled.div`
  margin-bottom: 20px;
  color: ${colors.secondaryTextColor};
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 28px;
  text-align: ${(props) => (props.align ? props.align : 'left')};
`;

export const TotalCounter = ({ total, align }) => {
  const { t } = useTranslation();
  return (
    <StyledTotalCounter align={align}>
      {total} {t('total_counter.entries_found', 'entries found')}
    </StyledTotalCounter>
  );
};

TotalCounter.propTypes = {
  total: PropTypes.number.isRequired,
  align: PropTypes.string,
};
