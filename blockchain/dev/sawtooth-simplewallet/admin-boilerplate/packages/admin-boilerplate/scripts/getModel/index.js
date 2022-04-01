const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const SUPER_ADMIN = {
  identifier: 'admin.test@co.kr',
  password: 'admin',
};
const fileModel = './scripts/generators/model-page/model-spec.json';
const homePagePath = 'src/containers/HomePage/collectionNames.json';
const prettierrcPath = '../../.prettierrc';
const URL = process.env.REACT_APP_SERVER;

const getPrettierrc = async () => {
  try {
    const prettierrc = await fs.promises.readFile(path.join(__dirname, prettierrcPath));
    return JSON.parse(prettierrc);
  } catch (error) {
    return {};
  }
};

const getModel = async (url, token) => {
  // Get tabWidth from the .prettierrc file
  const { tabWidth = 2 } = await getPrettierrc();

  try {
    // Get model spec from backend side
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataToSave = JSON.stringify(response.data.data, null, tabWidth);
    const collectionNameHomePage = JSON.stringify(
      JSON.parse(dataToSave).map((data) => data.collectionName),
      null,
      tabWidth,
    );

    // Write to model-spec.json
    await fs.promises.writeFile(fileModel, dataToSave);
    await fs.promises.writeFile(homePagePath, collectionNameHomePage);

    console.log('INFO: Get model successfully!');
  } catch (error) {
    console.log('ERROR:', error);
    console.log('INFO: Cannot get model');
  }
};

// Get token
axios
  .post(`${URL}/auth/local`, SUPER_ADMIN)
  .then((response) => {
    console.log('INFO: Get token successfully!');
    const token = response.data.jwt;
    getModel(`${URL}/model-specification`, token);
  })
  .catch((error) => {
    console.log('ERROR:', error);
    console.log('INFO: Cannot get token');
  });
