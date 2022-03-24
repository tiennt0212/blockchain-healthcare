import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import { MiniImage } from './MiniImage';

export const ImageGroup = ({ images, limit }) => {
  const hasMoreImages = images && images.length > 0;

  return (
    <Avatar.Group maxCount={limit}>
      {hasMoreImages ? (
        images.map(({ url, mime }, idx) => {
          const [type, ext] = mime.split('/');

          return type === 'image' ? (
            <MiniImage src={url} key={idx} />
          ) : (
            <MiniImage innerText={ext} key={idx} />
          );
        })
      ) : (
        <MiniImage src={images ? images.url : ''} />
      )}
    </Avatar.Group>
  );
};

ImageGroup.propTypes = {
  limit: PropTypes.number,
  images: PropTypes.array,
};

ImageGroup.defaultProps = {
  images: [],
  limit: 3,
};
