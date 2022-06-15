import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { isAbsoluteURL } from '../../utils/app';
import { URL_SERVER_HOST } from '../../utils/constants';

export const MiniImage = ({ src, innerText }) => {
  const url = isAbsoluteURL(src) ? src : `${URL_SERVER_HOST}${src}`;

  return (
    <Avatar
      src={url}
      size={{
        xs: 24,
        sm: 32,
        md: 40,
        lg: 64,
        xl: 80,
        xxl: 100,
      }}
    >
      {innerText?.toUpperCase() || (!src && 'N/A') || ''}
    </Avatar>
  );
};

MiniImage.propTypes = {
  src: PropTypes.string,
  innerText: PropTypes.string,
};

MiniImage.defaultProps = {
  src: '',
};
