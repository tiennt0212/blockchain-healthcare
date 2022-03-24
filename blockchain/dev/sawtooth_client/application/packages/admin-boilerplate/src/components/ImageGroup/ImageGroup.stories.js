import { ImageGroup } from './ImageGroup';
import { MiniImage } from './MiniImage';

export default {
  title: 'Components/ImageGroup',
  component: { MiniImage, ImageGroup },
};

const template = (args) => <ImageGroup {...args}></ImageGroup>;
const template2 = (args) => <MiniImage {...args}></MiniImage>;

export const defaultImage = template2.bind({});
export const defaultList = template.bind({});
export const listWithEmptyArray = template.bind({});
listWithEmptyArray.args = {
  images: [],
};

export const miniImage = template2.bind({});
miniImage.args = {
  src: 'https://www.w3schools.com/howto/img_avatar2.png',
};

const arrFullOfImages = [
  {
    id: 0,
    name: 'image_34',
    mime: 'image/png',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 1,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 2,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
];
export const ListFullImage = template.bind({});
ListFullImage.args = {
  images: arrFullOfImages,
  limit: 3,
};

const arrMixUp = [
  {
    id: 0,
    name: 'image_34',
    mime: 'image/png',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 1,
    name: 'video1',
    mime: 'video/mp4',
    url: 'dontcareit',
  },
  {
    id: 2,
    name: 'index.html',
    mime: 'text/html',
    url: 'dontcareit',
  },
];
export const listWithMixUpArray = template.bind({});
listWithMixUpArray.args = {
  images: arrMixUp,
  limit: 3,
};

const arrManyObject = [
  {
    id: 0,
    name: 'image_34',
    mime: 'image/png',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 1,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 2,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 3,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
  {
    id: 4,
    name: 'image_34',
    mime: 'image/jpeg',
    url: 'https://www.w3schools.com/howto/img_avatar2.png',
  },
];
export const overloadList = template.bind({});
overloadList.args = {
  images: arrManyObject,
  limit: 3,
};

const arrIncompleteURL = [
  {
    id: 0,
    name: 'image_34',
    mime: 'image/png',
    url: '/uploads/thiet_ke_noi_that_phong_chu_tich_giam_doc_4_fe79f7727f.jpg',
  },
  {
    id: 1,
    name: 'image_35',
    mime: 'image/png',
    url: '/uploads/thiet_ke_noi_that_phong_chu_tich_giam_doc_4_fe79f7727f.jpg',
  },
  {
    id: 2,
    name: 'image_36',
    mime: 'image/png',
    url: '/uploads/thiet_ke_noi_that_phong_chu_tich_giam_doc_4_fe79f7727f.jpg',
  },
];
export const srcNotURL3 = template.bind({});
srcNotURL3.args = {
  images: arrIncompleteURL,
  limit: 3,
};
